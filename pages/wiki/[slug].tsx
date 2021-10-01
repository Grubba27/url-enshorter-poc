import { google } from 'googleapis';
import { GetServerSideProps } from 'next';
import Page from '@components/page';
import { META_DESCRIPTION } from '@lib/constants';
import Layout from '@components/layout';

export const WikiPosts: GetServerSideProps = async ({ query }) => {


  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });

  const sheets = google.sheets({ version: 'v4', auth });

  const { id } = query;
  const range = `A1!A${id}:D${id}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [title, smallContent, additionalContent, img] = response.data.values[0];
  return {
    props: {
      title,
      smallContent,
      additionalContent,
      img
    }
  };
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function WikiPost({ title, smallContent, additionalContent, img }) {

  const meta = {
    title: `Wiki - ${title}`,
    description: META_DESCRIPTION
  };
  return (

    <Page meta={meta}>
      <Layout>
        <div>
          {smallContent}
        </div>
        <div>
          {additionalContent}
        </div>
        <div>
          {img}
        </div>
      </Layout>
    </Page>
  );
}
