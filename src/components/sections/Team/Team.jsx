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
        {teamData.map(({ name, position, img, description, color }) => (
          <TeamMemberCard
            key={position}
            name={name}
            position={position}
            img={img}
            description={description}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};
