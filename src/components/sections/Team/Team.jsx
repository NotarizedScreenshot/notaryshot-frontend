import React from 'react';
import { useTranslation } from 'react-i18next';
import { TeamMemberCard } from '../../TeamMemberCard/TeamMemberCard';
import styles from './Team.module.scss';

export const Team = () => {
  const { t } = useTranslation();
  const teamData = [
    {
      name: t('team.m1.name'),
      position: t('team.m1.position'),
      img: t('team.m1.img'),
      description: t('team.m1.description'),
      color: '#8f00ff',
    },
    {
      name: t('team.m2.name'),
      position: t('team.m2.position'),
      img: t('team.m2.img'),
      description: t('team.m2.description'),
      color: '#FF8A00',
    },
  ];

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{t('team.title')}</h4>
      <div className={styles.cards}>
        <div className={styles.mainCards}>
          <div className={styles.largeCard}>
            <div className={styles.ava}>
              <img src="public/images/evgen.png" alt="evgen" />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>Evgeniy Tsvigun</div>
              <div className={styles.position}>
                Developer
                <div>
                  <a href="https://t.me/utgardaloki" target="_blank">
                    <img src="public/images/tg-icon.png"></img>
                  </a>
                </div>
              </div>
              <div className={styles.description}>
                Blockchain Architect, back-end developer with over 20 years of experience,
                specializing in blockchain based solutions and big data/fast data processing.
              </div>
            </div>
          </div>
          <div className={styles.largeCard}>
            <div className={styles.ava}>
              <a href="https://t.me/utgardaloki" target="_blank">
                <img src="public/images/max.png" alt="evgen" />
              </a>
            </div>
            <div className={styles.info}>
              <div className={styles.name}>Maxim Babikhin</div>
              <div className={styles.position}>
                Project Manager
                <div>
                  <a href="https://t.me/baramba">
                    <img src="public/images/tg-icon.png"></img>
                  </a>
                </div>
              </div>
              <div className={styles.description}>
                Blockchain enthusiast, lover of computer games, father of two children
              </div>
            </div>
          </div>
          <div className={styles.largeCard}>
            <div className={styles.ava}>
              <a href="https://t.me/utgardaloki" target="_blank">
                <img src="public/images/nastia.png" alt="nasty" />
              </a>
            </div>
            <div className={styles.info}>
              <div className={styles.name}>Anastasia Busygina</div>
              <div className={styles.position}>
                Project Manager
                <div>
                  <a href="https://t.me/baramba">
                    <img src="public/images/tg-icon.png"></img>
                  </a>
                </div>
              </div>
              <div className={styles.description}>
                Interested in DAO and process optimization
              </div>
            </div>
          </div>
        </div>
        <div className={styles.minorCards}>
          <div className={styles.smallCard}>
            <div className={styles.name}>Poman Poludnev</div>
            <div className={styles.position}>Frontend</div>
          </div>
          <div className={styles.smallCard}>
            <div className={styles.name}>Alex Curtis</div>
            <div className={styles.position}>Designer</div>
          </div>
        </div>
      </div>
    </div>
  );
};
