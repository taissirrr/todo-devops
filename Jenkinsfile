pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('credential')
        DOCKER_IMAGE = "taissirguesmi1/jenkins"
    }
    
    stages {  
        stage('Dependency Check') {
            steps {
                sh '''
                dependencyCheck additionalArguments: '--
                scan ./ --disableYarnAudit --
                disableNodeAudit', odcInstallation:
                'owasp-dp-check'

                dependencyCheckPublisher pattern:
                '**/dependency-check-report.xml'
                '''
            }
        }
        
        stage('Build') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                    docker.image(builtImage.id).tag("${DOCKER_IMAGE}:jenkins")
                }
            }
        }
        
        stage('Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB_CREDENTIALS') {
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }
        
     stage('Deploy to Minikube') {
    steps {
        script {
            sh "minikube image load ${DOCKER_IMAGE}:latest"

            sh "kubectl create deployment jenkinsApp --image=${DOCKER_IMAGE}:latest --dry-run=client -o yaml | kubectl apply -f -"

            sh "kubectl expose deployment jenkinsApp --type=NodePort --port=80 --target-port=80"

            def nodePort = sh(script: "kubectl get service jenkinsApp -o=jsonpath='{.spec.ports[0].nodePort}'", returnStdout: true).trim()
            sh "kubectl port-forward service/jenkinsApp 8080:${nodePort} &"
        }
    }
     }
    }
}
