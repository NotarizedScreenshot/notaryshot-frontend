import { render, screen } from '@testing-library/react';
import { TweetDetailsPreview } from './TweetDetailsPreview';
import { tweetdataStub1 } from '__fixtures__/tweetdata';
describe('tweet details preview component', () => {
  test('if tweet preview renders', () => {
    render(
      <TweetDetailsPreview
        tweetData={tweetdataStub1}
        tweetStatsHash={''}
        tweetBodyDetailsHash={''}
        tweetUserInfoHash={''}
      />,
    );
    screen.getByText('Tweet stat details');
    //TODO: wrtie tests
  });
});
