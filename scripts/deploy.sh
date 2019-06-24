#!/bin/bash
set -o errexit
set -o pipefail

DEFAULT_GOOGLE_CLUSTER_NAME=soc
PROJECT_NAME=soc-frontend
set_variables() {
    COMMIT_HASH=$(git rev-parse --short HEAD)

    case "$CIRCLE_BRANCH" in
        develop-V2)
            IMAGE_TAG="staging-v2-${COMMIT_HASH}"
            ENVIRONMENT=staging
            GOOGLE_COMPUTE_ZONE=${STAGING_ZONE}
            GOOGLE_CLUSTER_NAME=${STAGING_CLUSTER_NAME}
            DEPLOYMENT_NAME="staging-v2-${PROJECT_NAME}"
            export NODE_ENV=staging_v2
            ;;
        develop)
            IMAGE_TAG="staging-${COMMIT_HASH}"
            ENVIRONMENT=staging
            GOOGLE_COMPUTE_ZONE=${STAGING_ZONE}
            GOOGLE_CLUSTER_NAME=${STAGING_CLUSTER_NAME}
            DEPLOYMENT_NAME="staging-${PROJECT_NAME}"
            export NODE_ENV=staging
            ;;
        master-V2)
            IMAGE_TAG="production-v2-${COMMIT_HASH}"
            ENVIRONMENT=production
            GOOGLE_COMPUTE_ZONE=${PRODUCTION_ZONE}
            GOOGLE_CLUSTER_NAME=${PRODUCTION_CLUSTER_NAME}
            DEPLOYMENT_NAME="production-v2-${PROJECT_NAME}"
            export NODE_ENV=production_v2
            ;;
        master)
            IMAGE_TAG="production-${COMMIT_HASH}"
            ENVIRONMENT=production
            GOOGLE_COMPUTE_ZONE=${PRODUCTION_ZONE}
            GOOGLE_CLUSTER_NAME=${PRODUCTION_CLUSTER_NAME}
            DEPLOYMENT_NAME="production-${PROJECT_NAME}"
            export NODE_ENV=production
            ;;
        *)
            echo "Err: This branch should not deploy."
            exit 1
            ;;
    esac
}
authorize_docker() {
    echo "====> Store Sand authenticate with service account"
    echo "$GCLOUD_SERVICE_KEY" | base64 --decode > "${HOME}"/gcloud-service-key.json


    echo "====> Login to docker registry"
    docker login -u _json_key -p "$(cat ${HOME}/gcloud-service-key.json)" https://gcr.io
}

deploy_image() {
    echo "====> Build application artifacts"
    yarn run build

    echo "====> Build docker image with built application artifacts"

    IMAGE="${DOCKER_REGISTRY}/${GOOGLE_PROJECT_ID}/${PROJECT_NAME}:${IMAGE_TAG}"

    docker build -t "$IMAGE" .

    docker push "$IMAGE"
}

install_google_cloud_sdk(){
    echo "====> Installing google cloud sdk"
    echo "deb http://packages.cloud.google.com/apt cloud-sdk-jessie main" | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
    sudo apt-get update && sudo apt-get install kubectl google-cloud-sdk
}

configure_google_cloud_sdk() {
    echo "Configuring Google Cloud Sdk"
    gcloud auth activate-service-account --key-file="${HOME}"/gcloud-service-key.json
    gcloud --quiet config set project "${GOOGLE_PROJECT_ID}"
    gcloud --quiet config set compute/zone "${GOOGLE_COMPUTE_ZONE}"
    gcloud --quiet container clusters get-credentials "${GOOGLE_CLUSTER_NAME}"
}

deploy_to_kubernetes(){
     echo "====> Prepare image for deployement"

    IMAGE="${DOCKER_REGISTRY}/${GOOGLE_PROJECT_ID}/${PROJECT_NAME}:${IMAGE_TAG}"
    echo "====> Deploying ${IMAGE} to ${DEPLOYMENT_NAME} in ${ENVIRONMENT} environment"


    kubectl set image deployment/${DEPLOYMENT_NAME} frontend="${IMAGE}" -n "${ENVIRONMENT}"

    if [ "$?" == "0" ]; then
        echo "Deployment completed succesfully"
    else
        echo "Failed to deploy ${IMAGE} to ${ENVIRONMENT} environment"
    fi

}

main() {
    set_variables
    authorize_docker
    deploy_image
    install_google_cloud_sdk
    configure_google_cloud_sdk
    deploy_to_kubernetes
}

main "$@"
