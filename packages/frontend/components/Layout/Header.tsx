import { useState } from "react"
import { useTheme } from "@mui/material/styles"
import Link from "next/link"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  MenuList,
  Grid,
} from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/router"

import styles from "../../styles/components/Header.module.css"
import { BurgerMenuIcon } from "./BurgerMenuIcon"
import ChainSelect from "../Form/ChainSelect"
import Parameters from "./Parameters"

import { chains } from "../../machines/auth.machine"

const pages = ["Markets", "Borrow", "Lend", "My positions"]
if (process.env.NODE_ENV === "development") {
  pages.push("Theming") // TODO: "Theming" page is to test design system
}

const Header = () => {
  const { palette } = useTheme()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const currentPage = router.pathname.substring(1) // TODO: Maybe not the best way

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget)

  const handleCloseNavMenu = () => setAnchorElNav(null)

  return (
    <>
      <AppBar position="static">
        <Box
          sx={{
            background: palette.background.paper,
            padding: "0 1.25rem",
          }}
        >
          <Toolbar disableGutters>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Link href="/">
                  <a className={styles.logoTitle}>
                    <Image
                      src="/assets/images/logo/logo-title.svg"
                      alt="Logo Fuji"
                      width={120}
                      height={50}
                      layout="fixed"
                    />
                  </a>
                </Link>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "flex", lg: "none" },
                    alignItems: "center",
                  }}
                >
                  <ChainSelect minified={true} selectedChain={chains[0]} />

                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleOpenNavMenu}
                    sx={{ pr: 0 }}
                  >
                    <BurgerMenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", lg: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Link href={`/${page.toLowerCase()}`}>
                          <Typography align="center">{page}</Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Grid>
            </Grid>

            <MenuList
              sx={{
                flexGrow: 1,
                display: { xs: "none", lg: "flex" },
                justifyContent: "center",
                mt: 1,
              }}
            >
              {pages.map((page: string) => (
                <MenuItem
                  key={page}
                  sx={{
                    color:
                      page.toLowerCase() === currentPage
                        ? "primary.main"
                        : "text.primary",
                    textShadow:
                      page.toLowerCase() === currentPage
                        ? `${palette.primary.main} 0rem 0rem 0.125rem`
                        : "",
                    "&:hover": {
                      color: "primary.main",
                      background: "transparent",
                      textShadow: `${palette.primary.main} 0rem 0rem 0.125rem`,
                    },
                  }}
                >
                  <Link href={`/${page.toLowerCase()}`}>{page}</Link>
                </MenuItem>
              ))}
            </MenuList>

            <Grid
              container
              columnGap="0.5rem"
              justifyContent="flex-end"
              sx={{ display: { xs: "none", lg: "flex" }, mt: "1rem" }}
            >
              <Grid item>
                <ChainSelect minified={false} selectedChain={chains[0]} />
              </Grid>
              <Grid item>
                <BalanceAddress />
              </Grid>
              <Grid item>
                <Parameters />
              </Grid>
            </Grid>
          </Toolbar>
        </Box>
      </AppBar>
    </>
  )
}

const BalanceAddress = () => {
  const { palette } = useTheme()
  const balance = 4.23
  const address = "0x6BV8...8974"

  return (
    <Box display="grid" gridTemplateColumns="1fr" sx={{ ml: "5rem" }}>
      <Box
        gridColumn={1}
        gridRow={1}
        sx={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "4rem",
          height: "2.25rem",
          padding: "0.438rem 0.75rem",
          marginLeft: "-5rem",
        }}
      >
        <Typography align="center" variant="small">
          {balance} ETH
        </Typography>
      </Box>
      <Box
        gridColumn={1}
        gridRow={1}
        sx={{
          background: palette.secondary.light,
          borderRadius: "4rem",
          height: "2.25rem",
          padding: "0.438rem 0.75rem",
        }}
      >
        <Typography align="center" variant="small">
          {address}
        </Typography>
      </Box>
    </Box>
  )
}

export default Header
