import { META_DESCRIPTION } from '@lib/constants';
import Page from '@components/page';
import Layout from '@components/layout';
import style from '@styles/wiki.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import creds from '../secrets.json';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GoogleSpreadsheet } = require('google-spreadsheet');


export default function RedirectRouter() {
  const [url, setUrl] = useState();
  const router = useRouter();
  const slug =  router.query;


  useEffect(() => {


    async function apiCall() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const doc = new GoogleSpreadsheet('12f_LRVjsk-6b9hyzIBJSe3lhaYlwn-7Y6EVHsS7_Uog');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await doc.useServiceAccountAuth(creds);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[1];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const rows = await sheet.getRows();
      const rowId = Number(slug.slug )
      if (rows[rowId - 2]) {
        console.log(rows[rowId - 2]._rawData[0])
        document.location.href = rows[rowId - 2]._rawData[0];
        setUrl(rows[rowId - 2]._rawData[0])

      } else {
        return
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }

    void apiCall().then();
  }, [slug.slug, url]);



  const meta = {
    title: 'Redirect',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        If nothing happens. your url is
        <br/>
       <a href={url}> {url}</a>
      </div>

      </Layout>
    </Page>
  );

}
