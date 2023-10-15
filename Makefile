proj_name=credit-package

build:
	docker build -t $(proj_name) .

run:
	docker run \
		-e AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" \
		-e AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" \
		-e OPENAI_API_KEY="${OPENAI_API_KEY}" \
		-e REACT_APP_BUILD_PATH="../public" \
		-e MOCK_REPORT="false" \
		-p 3000:3000 \
		--rm --name $(proj_name) -it $(proj_name)

stop:
	docker stop $(proj_name)
