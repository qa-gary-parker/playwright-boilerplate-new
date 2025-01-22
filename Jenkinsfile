pipeline {
   agent any
   stages {
      stage('e2e-tests') {
         steps {
            bat '''
            docker run --rm -v "%cd%:/tests" -w /tests mcr.microsoft.com/playwright:v1.49.1-noble /bin/bash -c "
            npm ci && npx playwright test
            "
            '''
         }
      }
   }
}