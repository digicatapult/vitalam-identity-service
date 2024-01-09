import fs from 'fs'
const packageJsonContent = fs.readFileSync('./package.json', 'utf-8')
const { version } = JSON.parse(packageJsonContent)

export default version
