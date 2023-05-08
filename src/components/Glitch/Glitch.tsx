import cn from 'classnames';
import { IGlitchProps } from './GlitchProps';
import classes from './Glitch.module.scss';
import { useEffect, useState } from 'react';
export const Glitch: React.FC<IGlitchProps> = () => {
  const [isInGlitch, setInGlitch] = useState<boolean>(false);

  const isShowRebooting = true;

  useEffect(() => {
    const maxCharacters = 24;
    const unloadedCharacter = '.';
    const loadedCharacter = '#';
    const spinnerFrames = ['/', '-', '\\', '|'];

    const loadingBars = document.querySelectorAll('.loading-bar');
    const processAmounts = document.querySelectorAll('.process-amount');
    const spinners = document.querySelectorAll('.spinner');

    const RandomNumber = (min: number, max: number) => Math.floor(Math.random() * max) + min;

    const RenderBar = (values: string[]) => {
      const currentLoaded = values.lastIndexOf(loadedCharacter) + 1;
      const loaded = values.slice(0, currentLoaded).join('');
      const unloaded = values.slice(currentLoaded).join('');

      // Update all the loading bars
      loadingBars.forEach((loadingBar) => {
        loadingBar.innerHTML = `(${loaded}<span class="loading-bar--unloaded">${unloaded}</span>)`;
      });

      // Update all the percentages
      const loadingPercent = Math.floor((currentLoaded / maxCharacters) * 100);
      processAmounts.forEach((processAmount) => {
        //@ts-ignore
        processAmount.innerText = loadingPercent;
      });
    };

    const DrawLoadingBar = (values: any) => {
      return new Promise<void>((resolve) => {
        const loadingBarAnimation = setInterval(() => {
          if (!values.includes(unloadedCharacter)) {
            clearInterval(loadingBarAnimation);
            resolve();
          }

          values.pop(unloadedCharacter);
          values.unshift(loadedCharacter);
          RenderBar(values);
        }, RandomNumber(300, 500));
      });
    };

    const DrawSpinner = (spinnerFrame = 0) => {
      return setInterval(() => {
        spinnerFrame += 1;
        //@ts-ignore
        spinners.forEach((spinner) => (spinner.innerText = `[${spinnerFrames[spinnerFrame % spinnerFrames.length]}]`));
      }, RandomNumber(50, 300));
    };

    const PlayHydra = async () => {
      setInGlitch(true);

      const loadingBar = new Array(maxCharacters).fill(unloadedCharacter) as string[];
      const spinnerInterval = DrawSpinner();

      await DrawLoadingBar(loadingBar);

      // Loading is complete on the next frame, hide spinner and glitch
      requestAnimationFrame(() => {
        clearInterval(spinnerInterval);
        setTimeout(PlayHydra);
      });
    };

    PlayHydra();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.glitchContainer}>
        <div className={cn(classes.terminal, isInGlitch ? classes.glitch : null)}>
          <div className={classes.scanline}></div>
          <p className={cn('spinner', isShowRebooting ? null : classes.hidden)}>[/]</p>
          <div className={cn(classes.hydra, 'hydra')}>
            <div className={cn('hydra_rebooting', isShowRebooting ? null : classes.hidden)}>
              <p>&lt; SYSTEM ORACLIZED &gt;</p>
              <p className={classes.textSm}>ORACLE VER 1.0 SCANNING</p>
              <p className={cn(classes.loadingBar, 'loading-bar')}></p>
            </div>
            <div className={cn('hydra_reboot_success', isShowRebooting ? classes.hidden : null)}>
              <p>VERYFIED BY QUANTUM ORACLE</p>
            </div>
          </div>
        </div>
        <div
          className={cn(
            classes.terminal,
            isInGlitch ? classes.glitch : null,
            classes.glitchClone,
            isInGlitch ? classes.glitchTop : null,
            isShowRebooting ? null : classes.hidden,
          )}
        >
          <div className={classes.scanline}></div>
          <p className={cn('spinner', isShowRebooting ? null : classes.hidden)}>[/]</p>
          <div className={cn(classes.hydra, 'hydra')}>
            <div className={cn('hydra_rebooting', isShowRebooting ? null : classes.hidden)}>
              <p>&lt; SYSTEM ORACLIZED &gt;</p>
              <p className={classes.textSm}>ORACLE VER 1.0 SCANNING</p>
              <p className={cn(classes.loadingBar, 'loading-bar')}></p>
            </div>
            <div className={cn('hydra_reboot_success', 'hidden')}>
              <p>VERYFIED BY QUANTUM ORACLE</p>
            </div>
          </div>
        </div>
        <div
          className={cn(
            classes.terminal,
            isInGlitch ? classes.glitch : null,
            classes.glitchClone,

            isInGlitch ? classes.glitchBottom : null,
            isShowRebooting ? null : classes.hidden,
          )}
        >
          <div className={classes.scanline}></div>
          <p className={cn('spinner', isShowRebooting ? null : classes.hidden)}>[/]</p>
          <div className={cn(classes.hydra, 'hydra')}>
            <div className={cn('hydra_rebooting', isShowRebooting ? null : classes.hidden)}>
              <p>&lt; SYSTEM ORACLIZED &gt;</p>
              <p className={classes.textSm}>ORACLE VER 1.0 SCANNING</p>
              <p className={cn(classes.loadingBar, 'loading-bar')}></p>
            </div>
            <div className='hydra_reboot_success hidden'>
              <p>VERYFIED BY QUANTUM ORACLE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
