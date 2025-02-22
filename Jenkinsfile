pipeline {
    agent any

    environment {
        NODE_VERSION = '18' // Adjust to match your project setup
    }

    options {
        timestamps() // Adds timestamps to logs
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    def nodeExists = sh(script: 'which node', returnStatus: true) == 0
                    if (!nodeExists) {
                        sh "curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -"
                        sh "apt-get install -y nodejs"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Use `npm ci` for reproducible installs
            }
        }

        stage('Run Playwright Tests in Shards') {
            steps {
                sh 'npx playwright install' // Ensure browsers are installed
                parallel (
                    shard1: {
                        sh 'npx playwright test --shard=1/3 --reporter=dot,junit'
                    },
                    shard2: {
                        sh 'npx playwright test --shard=2/3 --reporter=dot,junit'
                    },
                    shard3: {
                        sh 'npx playwright test --shard=3/3 --reporter=dot,junit'
                    }
                )
            }
        }

        stage('Publish Test Reports') {
            steps {
                junit '**/test-results/*.xml' // Collect JUnit test results
            }
        }

        stage('Generate Playwright Report') {
            steps {
                sh 'npx playwright show-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'test-results/**', fingerprint: true
            sh 'rm -rf test-results' // Cleanup after archiving
        }
        failure {
            echo "❌ Playwright tests failed. Check reports for details."
        }
        success {
            echo "✅ All Playwright tests passed successfully!"
        }
    }
}
