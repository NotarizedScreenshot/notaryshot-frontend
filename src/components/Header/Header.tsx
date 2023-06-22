import { useState } from 'react';
import { IHeaderProps } from './HeaderProps';
import styles from './Header.module.scss';
import { CustomConnectButton } from 'components/CustomConnectButton';
import { Navigation } from 'components/Navigation';
import { useModalDispatchContext, showModal, hideModal, EModalDialogTypes, useModalContext } from 'contexts';
import { Modal } from 'components/Modal';
export const Header: React.FC<IHeaderProps> = () => {
  const [iSshowMenu, setShowMenu] = useState<boolean>(false);
  const dispatch = useModalDispatchContext();
  const { isShowModal } = useModalContext();

  const showMenu = () => {
    setShowMenu(true);
    showModal(dispatch, EModalDialogTypes.headerMenu, {});
  };

  const hideMenu = () => {
    setShowMenu(false);
    dispatch(hideModal);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuButton}>
        <button className={styles.button} onClick={showMenu}>
          <div className={styles.burger}></div>
        </button>
      </div>
      {isShowModal && <Modal />}
      {iSshowMenu && (
        <div className={styles.menu}>
          <div className={styles.menuButton}>
            <button className={styles.button} onClick={hideMenu}>
              <div className={styles.close}></div>
            </button>
          </div>
          <Navigation vertical />
          <CustomConnectButton />
        </div>
      )}
      <div className={styles.title}>
        <a href='/'>
          <h3>Quantum Oracle</h3>
          <p className={styles.version}>alpha release v1.0.0-alpha</p>
        </a>
      </div>
      <div className={styles.navigation}>
        <Navigation />
      </div>
      <div className={styles.connect}>
        <CustomConnectButton />
      </div>
    </div>
  );
};
