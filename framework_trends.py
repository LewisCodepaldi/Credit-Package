import os
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from github import Github
from dotenv import load_dotenv
import datetime

load_dotenv()

frameworks = ['express', 'koa', 'nestjs', 'hapi', 'sails', 'loopback']

# Replace with your GitHub personal access token
github_token = os.getenv('GITHUB_ACCESS_TOKEN')

# Repository names for each framework
repositories = [
    "expressjs/express",
    "koajs/koa",
    "nestjs/nest",
    "hapijs/hapi",
    "balderdashy/sails",
    "strongloop/loopback-next",
]

# Initialize the GitHub client
github = Github(github_token)

# Function to fetch star history with reduced frequency
def fetch_star_history(repo_name, step=200):
    print(f"Fetching star history for {repo_name}")
    repo = github.get_repo(repo_name)
    stars = repo.get_stargazers_with_dates()
    
    star_dates = []
    star_counts = []
    total_stars = stars.totalCount
    total_pages = stars._PaginatedList__requester.per_page
    count = 0

    num_data_points = total_stars // step
    num_data_points = max(num_data_points, 1)
    step_adjusted = total_stars // num_data_points

    for i in range(0, total_stars, step_adjusted):
        try:
            page = i // total_pages
            index = i % total_pages
            star = stars.get_page(page)[index]
            star_dates.append(star.starred_at)
            count += step_adjusted
            star_counts.append(count)
        except IndexError:
            break

    # Add the last data point if not already included
    try:
        last_star_date = stars[-1].starred_at
        if star_dates and star_dates[-1] != last_star_date:
            star_dates.append(last_star_date)
            star_counts.append(total_stars)
    except IndexError:
        pass

    print(f"{repo_name}: {len(star_dates)} data points")
    return (star_dates, star_counts)

# Fetch star history for each framework
star_histories = [fetch_star_history(repo) for repo in repositories]
print(star_histories)

# Plot the star history
plt.figure(figsize=(12, 6))

for framework, history in zip(frameworks, star_histories):
    plt.plot(history[0], history[1], label=framework)

# Customize the plot
plt.title("Node.js Backend Framework Popularity (GitHub stars over time)")
plt.xlabel("Year")
plt.ylabel("GitHub Stars")
plt.legend(loc="upper left")

# Format x-axis
years = mdates.YearLocator()
years_fmt = mdates.DateFormatter("%Y")
plt.gca().xaxis.set_major_locator(years)
plt.gca().xaxis.set_major_formatter(years_fmt)

# Show the plot
plt.show()