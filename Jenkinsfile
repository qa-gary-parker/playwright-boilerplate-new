pipeline {
    agent any

    environment {
        NODE_VERSION = '18' // Adjust if necessary
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                bat 'where node || choco install nodejs-lts' // Install Node.js if missing
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests in Parallel') {
            parallel {
                stage('Shard 1') {
                    steps {
                        bat 'npx playwright test --shard=1/3 --reporter=junit --output=test-results/shard1'
                    }
                }
                // stage('Shard 2') {
                //     steps {
                //         bat 'npx playwright test --shard=2/3 --reporter=junit --output=test-results/shard2'
                //     }
                // }
                // stage('Shard 3') {
                //     steps {
                //         bat 'npx playwright test --shard=3/3 --reporter=junit --output=test-results/shard3'
                //     }
                // }
            }
        }
  }
}
