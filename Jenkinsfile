pipeline {
    agent any
    stages {
        stage('e2e-tests') {
            parallel {
                stage('Shard 1') {
                    steps {
                        bat '''
                        docker run --rm -v "%cd%:/tests" -w /tests mcr.microsoft.com/playwright:v1.49.1-noble /bin/bash -c "
                        npm ci && npx playwright test --shard=1/3 --reporter=json > test-results/shard1.json
                        "
                        '''
                    }
                }
                stage('Shard 2') {
                    steps {
                        bat '''
                        docker run --rm -v "%cd%:/tests" -w /tests mcr.microsoft.com/playwright:v1.49.1-noble /bin/bash -c "
                        npm ci && npx playwright test --shard=2/3 --reporter=json > test-results/shard2.json
                        "
                        '''
                    }
                }
                stage('Shard 3') {
                    steps {
                        bat '''
                        docker run --rm -v "%cd%:/tests" -w /tests mcr.microsoft.com/playwright:v1.49.1-noble /bin/bash -c "
                        npm ci && npx playwright test --shard=3/3 --reporter=json > test-results/shard3.json
                        "
                        '''
                    }
                }
            }
        }
        stage('Merge Reports') {
            steps {
                bat '''
                docker run --rm -v "%cd%:/tests" -w /tests mcr.microsoft.com/playwright:v1.49.1-noble /bin/bash -c "
                npx playwright merge-reports test-results --reporter=html
                "
                '''
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
        }
    }
}
