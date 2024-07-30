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
            <Typography>Hello there !</Typography>
            <Typography>
              Je suis Anthony, développeur logiciel depuis{" "}
              {new Date().getFullYear() - 2009} ans. J'aime l'entreprenariat,
              l'innovation et rendre la technologie facile et accessible au plus
              grand nombre.
            </Typography>
            <Typography>
              Après 9 ans dans les entreprises de services du numérique, je me
              suis lancé en freelance en 2018. Activité grâce à laquelle j'ai pu
              contribuer à développer plusieurs startups et jusqu'à en lancer
              une à mon tour en 2020.
            </Typography>
            <Typography>
              Toujours curieux et aimant partager mes apprentissages, je peux
              vous accompagner en tant que CTO Hands on, as a service ou
              co-founder, ou intégrer une équipe de développement en tant que
              freelance.
            </Typography>
            <Typography>
              J'assure également un rôle de mentor tech auprès de juniors et
              rassemble un collectif de freelances au profils plutôt seniors en
              quête d'intervenir sur des missions en full remote.
            </Typography>

            <Typography>
              N'hésitez pas à me contacter, via Twitter ou LinkedIn.
            </Typography>
          </Stack>
        </Container>
      </main>
    </Layout>
  )
}
