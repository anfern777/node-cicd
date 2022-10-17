import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

async function get(key) {
  const smClient = new SecretsManagerClient({
    region: 'eu-west-1',
    // if no IAM instance role with permissions
    // credentials: {
    //   accessKeyId: '',
    //   secretAccessKey: '',
  });

  if (process.env.NODE_ENV === 'production') {
    const command = new GetSecretValueCommand({
      SecretId:
        'secret-arn',
    });
    try {
      const secret = await this.smClient.send(command);
      envConfig = JSON.parse(secret.SecretString);
      return envConfig[key];
    } catch (err) {
      switch (err.name) {
        case 'DecryptionFailureException':
          console.error(
            "Secrets Manager can't decrypt the protected secret text using the provided KMS key.",
          );
          throw err;
        case 'InternalServiceErrorException':
          console.error('An error occurred on the server side.');
          throw err;
        case 'InvalidParameterException':
          console.error('You provided an invalid value for a parameter.');
          throw err;
        case 'InvalidRequestException':
          console.error(
            'You provided a parameter value that is not valid for the current state of the resource',
          );
          throw err;
        case 'ResourceNotFoundException':
          console.error('We cannot find the resource that you asked for.');
          throw err;
      }
    }
  }
}
