import cn from 'classnames';
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
        <section className={cn(styles.section, styles.leak)}>
          <h3 className={styles.h3}>Tweet Leak</h3>
          <div className={styles.content}>
            <div className={styles.process}>
              <ProcessEvent
                message='OMG! We found a flying saucer in the desert! I have to post this!'
                userPic='images/card1-person-1.png'
                tweetPic='images/card1-tweet-1.png'
              />
            </div>
            <div className={styles.arrow}>
              <p className={styles.p2}>post UFO leak &quot;Here&apos;s the photo! #UFO #lead #coverup&quot;</p>
              <div className={styles.soildArrowRight}></div>
            </div>
            <div className={styles.action}>
              <ProcessAction iconImageUrl='images/subjects-icons/ufo-fan-icon.png' personTitle='UFO Fan'>
                <p className={styles.p2}>
                  OMG, finally evidence of the government covering up UFO sightings! I knew it all along.
                </p>
              </ProcessAction>
            </div>
            <div className={styles.arrow}>
              <p className={styles.p2}>new UFO leak tweet, id 1633259864473337856</p>
              <div className={styles.dottedArrowLeft}></div>
            </div>
          </div>
        </section>
        <section className={cn(styles.section, styles.evidence)}>
          <h3 className={styles.h3}>Evidence Preservation</h3>
          <div className={styles.content}>
            <div className={styles.action}>
              <ProcessAction
                iconImageUrl='images/subjects-icons/agent-tech-icon.png'
                personTitle='CIA Chief Technology Officer'
              >
                <p className={styles.p2}>
                  The tweet is too importantto lose, I must act fast to preserve it. The evidence may vanish any minute,
                  I need to cave it in a secure place. Time is of the essence.
                </p>
              </ProcessAction>
            </div>
            <div className={cn(styles.arrow, styles.mint)}>
              <p className={styles.p2}>mintTweet</p>
              <p className={styles.p3}>{`(1633259864473337856)`}</p>
              <div className={styles.soildArrowRight}></div>
            </div>

            <div className={cn(styles.arrow, styles.get)}>
              <p className={styles.p2}>Get tweet</p>
              <p className={styles.p3}>{`(1633259864473337856)`}</p>
              <div className={styles.soildArrowRight}></div>
            </div>

            <div className={styles.process}>
              <ProcessEvent
                message='I must save the evidence immediately before they hide it again. I use QuantumOracle!'
                userPic='images/card2-person-2.png'
                tweetPic='images/card2-tweet-2.png'
              />
            </div>

            <div className={cn(styles.action, styles.actionsList)}>
              <ProcessAction>
                <ul className={styles.list}>
                  <li className={styles.listElement}>Add tweet metadata</li>
                  <li className={styles.listElement}>Hash all tweet content: text and mediafiles</li>
                  <li className={styles.listElement}>Save them into Content Address Storage</li>
                  <li className={styles.listElement}>Mint NFT</li>
                </ul>
                <div className={styles.turnAroundArrowLeft}>
                  <p className={styles.p2}>Save tweet</p>
                </div>
              </ProcessAction>
            </div>
            <div className={cn(styles.arrow, styles.nft)}>
              <div className={styles.nftArrow}>
                <p className={styles.p2}>NFT</p>
                <div className={styles.dottedArrowLeft}></div>
              </div>
            </div>
            <div className={cn(styles.action, styles.haiku)}>
              <ProcessAction>
                <ul className={styles.list}>
                  <div className={styles.sakura}>🌸</div>
                  <li className={styles.listElement}>Evidence now safe</li>
                  <li className={styles.listElement}>Proudly holding NFT</li>
                  <li className={styles.listElement}>Truth shall not be lost</li>
                </ul>
              </ProcessAction>
            </div>
          </div>
        </section>
        <section className={cn(styles.section, styles.cover)}>
          <h3 className={styles.h3}>Cover-up attempt</h3>
          <div className={styles.content}>
            <div className={styles.process}>
              <ProcessEvent
                message='I have to delete this tweet immediately and keep the secret!'
                userPic='images/card3-person-3.png'
                tweetPic='images/card3-tweet-3.png'
              />
            </div>
            <div className={styles.arrow}>
              <p className={styles.p2}>Delete tweet 1633259864473337856</p>
              <div className={styles.soildArrowRight}></div>
            </div>
          </div>
        </section>
        <section className={cn(styles.section, styles.storage)}>
          <h3 className={styles.h3}>Decentralized Storage in Use</h3>
          <div className={styles.content}>
            <div className={styles.arrow}>
              <p className={styles.p2}>tweetScreenshot</p>
              <p className={styles.p3}>{`(1633259864473337856)`}</p>
              <div className={styles.dottedArrowLeft}></div>
            </div>
            <div className={styles.process}>
              <ProcessEvent
                message="I stored the evidence in a decentralized storage and blockchain. Shh... don't tell the CIA where I live."
                userPic='images/card4-person-4.png'
                tweetPic='images/card4-tweet-4.png'
              />
            </div>
            <div className={styles.action}>
              <ProcessAction iconImageUrl='images/subjects-icons/ufo-fan-icon.png' personTitle='UFO Fan'>
                <p className={styles.p2}>
                  I saved the evidence in a deceptralized storage and blockchain, now they can’t hide it!
                </p>
              </ProcessAction>
            </div>
          </div>
        </section>
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
