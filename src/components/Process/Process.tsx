import { IProcessProps } from './ProcessProps';
import styles from './Process.module.scss';
import { ProcessAction, ProcessEvent, ProcessSubject } from './processComponents';
export const Process: React.FC<IProcessProps> = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>UFO Leak Tweet Processing</h2>
      <div className={styles.subjects}>
        <ProcessSubject iconImageUrl='images/subjects-icons/agent-smith-icon.png' title={['CIA  Agent', ' Smith']} />
        <ProcessSubject iconImageUrl='images/subjects-icons/ufo-fan-icon.png' title='UFO Fan' />
        <ProcessSubject iconImageUrl='images/subjects-icons/qa-icon.png' title='Quantum Oracle' />
        <ProcessSubject iconImageUrl='images/subjects-icons/twitter-icon.png' title='Twitter' />
      </div>
      <div className={styles.processes}>
        <div className={styles.lines}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        <section className={styles.element} id='tweet-leak'>
          <h3 className={styles.h3}>Tweet Leak</h3>

          <div className={styles.content}>
            <div className={styles.row12}>
              <ProcessEvent
                message='OMG! We found a flying saucer in the desert! I have to post this!'
                userPic='images/card1-person-1.png'
                tweetPic='images/card1-tweet-1.png'
              />
            </div>
            <div className={`${styles.col24} ${styles.aligncenter}`}>
              <p className={`${styles.p2} ${styles.mw275}`}>post UFO leak "Here's the photo! #UFO #lead #coverup"</p>
              <div className={styles.soildArrowRight}></div>
            </div>

            <div className={`${styles.lastCol} ${styles.row12}`}>
              <ProcessAction iconImageUrl='images/subjects-icons/ufo-fan-icon.png' personTitle='UFO Fan'>
                <p className={`${styles.p2} ${styles.mw275}`}>
                  OMG, finally evidence of the government covering up UFO sightings! I knew it all along.
                </p>
              </ProcessAction>
            </div>
            <div className={styles.col34}>
              <p className={`${styles.p2}`}>new UFO leak tweet, id 1633259864473337856</p>
              <div className={styles.dottedArrowLeft}></div>
            </div>
          </div>
        </section>
        <section className={styles.element} id='evidence-preserve'>
          <h3 className={styles.h3}>Evidence Preservation</h3>
          <div className={styles.content}>
            <div className={styles.row15}>
              <ProcessAction
                iconImageUrl='images/subjects-icons/agent-tech-icon.png'
                personTitle='CIA Chief Technology Officer'
              >
                <p className={`${styles.p2} ${styles.mw275}`}>
                  The tweet is too importantto lose, I must act fast to preserve it. The evidence may vanish any minute,
                  I need to cave it in a secure place. Time is of the essence.
                </p>
              </ProcessAction>
            </div>
            <div className={styles.col3}>
              <p className={`${styles.p2}`}>mintTweet</p>
              <p className={`${styles.p3}`}>{`(1633259864473337856)`}</p>
              <div className={styles.soildArrowRight}></div>
            </div>
            <div className={`${styles.col4} ${styles.row2}`}>
              {/* <p></p> */}
              <p className={`${styles.p2}`}>Get tweet</p>
              <p className={`${styles.p3}`}>{`(1633259864473337856)`}</p>

              <div className={styles.soildArrowRight}></div>
            </div>
            <div className={`${styles.col23} ${styles.row3} ${styles.justEnd} ${styles.pr10}`}>
              <ProcessAction>
                <ul className={styles.list}>
                  <li className={styles.listElement}>Add tweet metadata</li>
                  <li className={styles.listElement}>Hash all tweet content: text and mediafiles</li>
                  <li className={styles.listElement}>Save them into Content Address Storage</li>
                  <li className={styles.listElement}>Mint NFT</li>
                </ul>
              </ProcessAction>
              <div className={styles.turnAroundArrowLeft}></div>
            </div>
            <div className={`${styles.pl28} ${styles.pr10} ${styles.col23} ${styles.row4} `}>
              <ProcessAction>
                <p className={`${styles.p2} ${styles.mw275}`}>
                  Evidence now safe, Proudly holding NFT, Truth shall not be lost.
                </p>
              </ProcessAction>
              <div className={styles.nftArrow}>
                <p className={`${styles.p2}`}>NFT</p>
                <div className={styles.dottedArrowLeft}></div>
              </div>
            </div>
            <div className={`${styles.lastCol} ${styles.row15}`}>
              <ProcessEvent
                message='I must save the evidence immediately before they hide it again. I use QuantumOracle!'
                userPic='images/card2-person-2.png'
                tweetPic='images/card2-tweet-2.png'
              />
            </div>
          </div>
        </section>
        <section className={styles.element}>
          <h3 className={styles.h3}>Cover-up attempt</h3>
          <div className={styles.content}>
            {/* <div className={styles.lastCol}> */}
            <ProcessEvent
              message='OMG! We found a flying saucer in the desert! I have to post this!'
              userPic='images/card3-person-3.png'
              tweetPic='images/card3-tweet-3.png'
            />
            <div className={`${styles.col24} ${styles.aligncenter}`}>
              <p className={`${styles.p2} ${styles.mw275}`}>Delete tweet 1633259864473337856</p>
              <div className={styles.soildArrowRight}></div>
            </div>
            {/* </div> */}
          </div>
        </section>
        <div className={styles.element}>
          <h3 className={styles.h3}>Decentralized Storage in Use</h3>
          <div className={styles.content}>
            <div className={styles.col3}>
              <p className={`${styles.p2}`}>tweetScreenshot</p>
              <p className={`${styles.p3}`}>{`(1633259864473337856)`}</p>
              <div className={styles.dottedArrowLeft}></div>
            </div>
            <div className={`${styles.col23} ${styles.justCenter}`}>
              <ProcessAction iconImageUrl='images/subjects-icons/ufo-fan-icon.png' personTitle='UFO Fan'>
                <p className={`${styles.p2} ${styles.mw275}`}>
                  I saved the evidence in a deceptralized storage and blockchain, now they can’t hide it!
                </p>
              </ProcessAction>
            </div>
            <div className={`${styles.lastCol} ${styles.row12}`}>
              <ProcessEvent
                message='I must save the evidence immediately before they hide it again. I use QuantumOracle!'
                userPic='images/card4-person-4.png'
                tweetPic='images/card4-tweet-4.png'
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.subjects}>
        <ProcessSubject iconImageUrl='images/subjects-icons/agent-smith-icon.png' title={['CIA  Agent', ' Smith']} />
        <ProcessSubject iconImageUrl='images/subjects-icons/ufo-fan-icon.png' title='UFO Fan' />
        <ProcessSubject iconImageUrl='images/subjects-icons/qa-icon.png' title='Quantum Oracle' />
        <ProcessSubject iconImageUrl='images/subjects-icons/twitter-icon.png' title='Twitter' />
      </div>
    </div>
  );
};
