pipeline {
  agent any
  tools {nodejs "node"}

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }
     stage('Playwright'){
      environment {
        MAX_SHARDS = '2'
      }
      parallel {
        stage('Shard #1') {
          agent {
            docker {
              image 'mcr.microsoft.com/playwright:v1.50.0-noble'
              reuseNode true
            }
          }
          environment {
            SHARD = '1'
          }
          steps {
            sh 'npm ci'
            sh "npx playwright test --shard=${SHARD}/${env.MAX_SHARDS}"
          }
          post {
            always {
              archiveArtifacts 'test-results/**'
            }
          }
        }
        stage('Shard #2') {
          agent {
            docker {
              image 'mcr.microsoft.com/playwright:v1.50.0-noble'
              reuseNode true
            }
          }
          environment {
            SHARD = '2'
          }
          steps {
            sh 'npm ci'
            sh "npx playwright test --shard=${SHARD}/${env.MAX_SHARDS}"
          }
          post {
            always {
              archiveArtifacts 'test-results/**'
            }
          }
        }
      }
    }
  }
}