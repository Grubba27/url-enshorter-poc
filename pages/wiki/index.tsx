import { META_DESCRIPTION } from '@lib/constants';
import Page from '@components/page';
import Layout from '@components/layout';
import style from '../../styles/wiki.module.css';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GoogleSpreadsheet } = require('google-spreadsheet');

import creds from '../../secrets.json';


export default function Wiki() {


  const [arrayTitles, setArrayTitles] = useState([]);
  useEffect(() => {

    async function apiCall() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const doc = new GoogleSpreadsheet('12f_LRVjsk-6b9hyzIBJSe3lhaYlwn-7Y6EVHsS7_Uog');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await doc.useServiceAccountAuth(creds);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await doc.loadInfo();


      const sheet = doc.sheetsByIndex[0];


      // eslint-disable-next-line @typescript-eslint/no-unsafe-call

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const row = await sheet.loadCells('A1:A100');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
      const titleArray = sheet._cells.map(cell => [cell[0]._rawData.formattedValue, cell[0]._row ]);
      setArrayTitles(titleArray);

    }

    void apiCall().then();
  }, [arrayTitles]);
  const meta = {
    title: 'Wiki',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <div className={style.titleWiki}>
          <span>
            Please select an article to start reading
          </span>
        </div>

        <div className={style.wikiList}>
          {arrayTitles.map((item, index) =>
            <p key={index}>{item[0] ? <>{item[0]} <a key={1000 + index} href={`wiki/${item[1]}`}>link</a></> : false}</p>
          )}
        </div>

      </Layout>
    </Page>
  );
}
