import Head from 'next/head'

import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <h1 className="bg-gray-600 text-red-500">Ola</h1>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const allPostsData = []
  return {
    props: {
      allPostsData,
    },
  }
}
