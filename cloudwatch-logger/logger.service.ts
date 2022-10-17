import {
  CloudWatchLogsClient,
  DescribeLogStreamsCommand,
  PutLogEventsCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import { msg_IF } from './msg.interface';

/**
 * API Ref.
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch-logs/index.html
 */

async function log(
  msg: msg_IF
): Promise<void> {

  // initialize AWS Client to Cloudwatch interaction
  this.client = new CloudWatchLogsClient({
    region: 'eu-west-1',
    // provide credentials if no IAM instance role with permissions 
    // credentials'';
  });

  const logMessage: string = JSON.stringify(msg);

  const targetLogGroup = 'target_log-group';
  const targetLogStream = 'target_log-stream';

  const describeCommand = new DescribeLogStreamsCommand({
    logGroupName: targetLogGroup,
    logStreamNamePrefix: targetLogStream,
  });

  try {
    const result = await this.client.send(describeCommand);
    const sequenceToken = result.logStreams[0].uploadSequenceToken;
    const logCommand = new PutLogEventsCommand({
      logGroupName: targetLogGroup,
      logStreamName: targetLogStream,
      logEvents: [
        {
          message: logMessage,
          timestamp: new Date().getTime(),
        },
      ],
      sequenceToken: sequenceToken,
    });
    await this.client.send(logCommand);
  } catch (err: any) {
    throw new InternalServerErrorException(err);
  }
}
