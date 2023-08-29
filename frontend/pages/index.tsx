import { NavBar } from '~/components/NavBar'
import type { NextPage } from 'next'
import Image from 'next/image'
import desktopImage from '../src/static/desktop.svg'
import Typography from '@mui/material/Typography'
import { useStarknet } from '@starknet-react/core'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { Container, Grid, Card, CardContent } from '@mui/material'

const Home: NextPage = () => {
  const { account } = useStarknet()
  return (
    <div>
      <NavBar />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Image src={desktopImage} layout="responsive" width="700px" height="700px" />
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  StarkCare: Revolutionizing Healthcare
                </Typography>
                <Typography variant="body1">
                  StarkCare is a medical information system with on-chain verification enabled by StarkNet.
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Why Choose StarkCare?
                </Typography>
                <Typography variant="body1">
                  Most medical records are stored in centralized databases controlled by healthcare institutions. StarkCare offers a decentralized, secure, and immutable solution.
                </Typography>
                {account && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                  >
                    <Link href="/prescription">
                      <a style={{ textDecoration: 'none', color: 'white' }}>
                        Prescribe as Doctor
                      </a>
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Home