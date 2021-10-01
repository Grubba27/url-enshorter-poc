import { META_DESCRIPTION } from '@lib/constants';
import Page from '@components/page';
import Layout from '@components/layout';
import style from '../../styles/wiki.module.css';
import { useEffect, useState } from 'react';
import { google } from 'googleapis';


export default function Wiki() {

  const [titleList, setTitleList] = useState(['']);

  useEffect( () => {
    async function apiCall() {
      const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });

      const sheets = google.sheets({ version: 'v4', auth });

      const range = `A1!A1`;

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const [titles] = response.data.values;
      setTitleList(titles);
    }

    void apiCall().then(r => console.log(r));
  });
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


        <div>{titleList}</div>
      </Layout>
    </Page>
  );
}
