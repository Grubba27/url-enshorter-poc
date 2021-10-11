/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import cn from 'classnames';
import styleUtils from './utils.module.css';
import styles from './hero.module.css';
import { BRAND_NAME, DATE, SITE_DESCRIPTION } from '@lib/constants';
import React, { useEffect, useState } from 'react';
import creds from '../secrets.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GoogleSpreadsheet } = require('google-spreadsheet');

export default function Hero() {

  const [bigUrl, setBigUrl] = useState('');

  const typeEvent = (e: React.FormEvent<HTMLInputElement>) => {
    setBigUrl(e.currentTarget.value);
  }

  useEffect(() => {

    async function createUrl() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const doc = new GoogleSpreadsheet('12f_LRVjsk-6b9hyzIBJSe3lhaYlwn-7Y6EVHsS7_Uog');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await doc.useServiceAccountAuth(creds);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await doc.loadInfo();


      const sheet = doc.sheetsByIndex[1];

      console.log(sheet.title);
    }


    void createUrl().then();
  });

  return (
    <div className={styles.wrapper}>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-mobile'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <h1 className={cn(styleUtils.appear, styleUtils['appear-third'], styles.hero)}>
        Your free wiki
        <br className={styleUtils['show-on-desktop']} /> hosted on excel
      </h1>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-tablet'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <div className={cn(styleUtils.appear, styleUtils['appear-fourth'], styles.info)}>
        <p>
          <strong>And free url-shorter</strong>
          <br />
          <strong>Type your big url</strong>
          <br />
          <input className={styleUtils.myInput} id={'movie'} name={'movie'}
                 required={true}
                 placeholder={'Type your big url'}
                 type={'text'} value={bigUrl}
                 onInput={e => typeEvent(e)} />
          <br/>
          <button className={styleUtils.myButton}> Create Url</button>
        </p>
      </div>
    </div>
  );
}
