import React from 'react';
import styles from './TeamMemberCard.module.scss';

export const TeamMemberCard = ({ name, position, img, description, color }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{ borderColor: `${color}`, filter: `drop-shadow(0px 0px 34px ${color})` }}
      >
        <img src={img} alt="team"></img>
      </div>
      <div className={styles.position} style={{ backgroundColor: `${color}` }}>
        {position}
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.description}>
        <span>{description}</span>
      </div>
    </div>
  );
};
