import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import HomepageFeatures from "@site/src/components/HomepageFeatures"
import Heading from "@theme/Heading"

import styles from "./index.module.css"
import { Container, Stack, Typography } from "@mui/material"

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  return (
    <Layout title={`Docs`} description="Antho's studies and notes">
      <HomepageHeader />
      <main>
        <Container sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Typography>
              Hello there ! Bienvenue sur mon espace <i>notes en ligne</i>.
            </Typography>
            <Typography>
              Je suis Anthony, développeur logiciel depuis{" "}
              {new Date().getFullYear() - 2009} ans. J'utilise cet espace pour y
              collecter mes notes et apprentissages.
            </Typography>
          </Stack>
        </Container>
      </main>
    </Layout>
  )
}
