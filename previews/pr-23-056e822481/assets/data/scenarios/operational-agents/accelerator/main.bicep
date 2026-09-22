targetScope = 'resourceGroup'

@description('Public Azure region supporting the selected model and Foundry project.')
param location string = resourceGroup().location

@minLength(5)
@maxLength(12)
param resourceToken string

@description('Signed-in operator object ID. Used only for scoped data-plane access.')
param principalId string

@description('Choose an available chat model and explicit version before deployment.')
param modelName string
param modelVersion string
param modelDeploymentName string
param modelSkuName string

@minValue(1)
param modelCapacity int = 10

param tags object = {}

resource account 'Microsoft.CognitiveServices/accounts@2025-06-01' = {
  name: 'aif-${resourceToken}'
  location: location
  tags: tags
  kind: 'AIServices'
  sku: { name: 'S0' }
  identity: { type: 'SystemAssigned' }
  properties: {
    allowProjectManagement: true
    customSubDomainName: 'aif-${resourceToken}'
    disableLocalAuth: true
    publicNetworkAccess: 'Enabled'
  }
}

resource deployment 'Microsoft.CognitiveServices/accounts/deployments@2025-06-01' = {
  parent: account
  name: modelDeploymentName
  sku: { name: modelSkuName, capacity: modelCapacity }
  properties: {
    model: { format: 'OpenAI', name: modelName, version: modelVersion }
    versionUpgradeOption: 'NoAutoUpgrade'
  }
}

resource project 'Microsoft.CognitiveServices/accounts/projects@2025-06-01' = {
  parent: account
  name: 'operational-agents'
  location: location
  tags: tags
  identity: { type: 'SystemAssigned' }
  properties: {
    displayName: 'Operational Agents'
    description: 'Bounded tool execution over synthetic local records.'
  }
}

var foundryUser = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '53ca6127-db72-4b80-b1b0-d745d6d5456d')
var modelUser = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '5e0bd9bd-7b93-4f28-af87-19fc36ad61bd')

resource operatorProjectAccess 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(project.id, principalId, foundryUser)
  scope: project
  properties: {
    roleDefinitionId: foundryUser
    principalId: principalId
    principalType: 'User'
  }
}

resource operatorModelAccess 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(account.id, principalId, modelUser)
  scope: account
  properties: {
    roleDefinitionId: modelUser
    principalId: principalId
    principalType: 'User'
  }
}

output AZURE_AI_PROJECT_ENDPOINT string = 'https://${account.name}.services.ai.azure.com/api/projects/${project.name}'
output AZURE_AI_MODEL_DEPLOYMENT_NAME string = deployment.name
