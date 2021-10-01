import { useEffect, useState } from 'react';
import creds from '../../secrets.json';
import style from '../../styles/wiki.module.css';

const { GoogleSpreadsheet } = require('google-spreadsheet');
import Page from '@components/page';
import { META_DESCRIPTION } from '@lib/constants';
import Layout from '@components/layout';
import { useRouter } from 'next/router';



export default function WikiPost( ) {
  type Post = { title: string, cont1: string, cont2: string }
  const [post, setPost] = useState({ title: '', cont1: '', cont2: '' });

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

      const sheet = doc.sheetsByIndex[0];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const rows: Post[] = await sheet.getRows();


      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setPost(rows[slug.slug]);
    }

    void apiCall().then();
  }, [slug.slug]);

  const meta = {
    title: `Wiki`,
    description: META_DESCRIPTION
  };

  return (

    <Page meta={meta}>
      <Layout>
        <div className={style.titleWiki} style={{flexDirection: 'column'}}>
          <div>
            {post?.cont1 ? post.cont1 : false}
          </div>
          <div>
            {post?.cont2 ? post.cont2 : false}
          </div>
        </div>
        <a href={'/wiki'} style={{textAlign: 'center'}}>return </a>
      </Layout>
    </Page>
  );
}
