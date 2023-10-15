import { v4 as uuidv4 } from 'uuid'

export default {
  generateUUID: (): string => {
    return uuidv4()
  },
}
