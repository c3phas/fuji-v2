import React from "react"
import { useTheme } from "@mui/material/styles"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Fade,
  Grid,
  Link,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { formatUnits } from "ethers/lib/utils"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import CheckIcon from "@mui/icons-material/Check"
import { BorrowingVault, LendingProviderDetails } from "@x-fuji/sdk"

import CurrencyCard from "./CurrencyCard"
import LTVProgressBar from "./LTVProgressBar"

import ClickableTooltip from "../Shared/ClickableTooltip"
import { useBorrow } from "../../store/borrow.store"
import { DEFAULT_LTV_RECOMMENDED } from "../../constants/borrow"
import { NetworkIcon, ProviderIcon } from "../Shared/Icons"
import { providersForRoute, RouteMeta } from "../../helpers/borrowService"

export default function Overview() {
  const { palette } = useTheme()
  const ltv = useBorrow((state) => state.position.ltv)
  const ltvMax = useBorrow((state) => state.position.ltvMax)
  const ltvThreshold = useBorrow((state) => state.position.ltvThreshold)
  const liquidationPrice = useBorrow((state) => state.position.liquidationPrice)
  const liquidationDiff = useBorrow((state) => state.position.liquidationDiff)
  const collateral = useBorrow((state) => state.position.collateral)
  const debt = useBorrow((state) => state.position.debt)
  const providers = useBorrow((state) => state.position.providers)
  const vault = useBorrow((state) => state.position.vault)
  const availableVaults = useBorrow((state) => state.availableVaults)
  const availableRoutes = useBorrow((state) => state.availableRoutes)
  const changeActiveVault = useBorrow((state) => state.changeActiveVault)

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Card
        sx={{
          flexDirection: "column",
          alignItems: "center",
          p: "1.5rem 2rem",
          width: "100%",
        }}
      >
        <CardContent sx={{ padding: 0, gap: "1rem" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height="40px"
          >
            <Typography variant="body2">Overview</Typography>
            {availableRoutes.length > 0 && vault && (
              <Stack direction="row" alignItems="center">
                <Tooltip
                  arrow
                  title={
                    <span>
                      We take into account variables such as liquidity, audits
                      and team behind each protocol, you can read more on our
                      risk framework{" "}
                      <Link
                        href="https://docs.fujidao.org/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <u> here</u>
                      </Link>
                    </span>
                  }
                  placement="top"
                >
                  <InfoOutlinedIcon
                    sx={{ fontSize: "1rem", color: palette.info.main }}
                  />
                </Tooltip>
                <Typography variant="smallDark" ml={0.5} mr={1}>
                  Safety rating:
                </Typography>
                <VaultsMenu
                  vault={vault}
                  routes={availableRoutes}
                  onSelection={(route) => {
                    const v = availableVaults.filter(
                      (v) => v.address.value === route.address
                    )[0]
                    changeActiveVault(v)
                  }}
                />
              </Stack>
            )}
          </Stack>
          <Divider sx={{ mt: "1rem", mb: "1.5rem" }} />

          <Grid container columnSpacing="1rem">
            <Grid item xs={6}>
              <CurrencyCard
                informations={{
                  title: "Collateral Provided",
                  amount: `${collateral.amount.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })} ${collateral.token.symbol}`,
                  footer: (
                    collateral.amount * collateral.usdValue
                  ).toLocaleString("en-US", {
                    style: "currency",
                    currency: "usd",
                  }),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CurrencyCard
                informations={{
                  title: "Borrowed Value",
                  amount: (debt.amount * debt.usdValue).toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "usd",
                    }
                  ),
                  footer: `${debt.amount.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })} ${debt.token.symbol}`,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <CurrencyCard
                informations={{
                  title: "Liquidation Price",
                  amount:
                    liquidationDiff >= 0
                      ? liquidationPrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "usd",
                        })
                      : "$0",
                  footer:
                    liquidationDiff >= 0
                      ? `~${liquidationDiff}% below current price`
                      : `n/a`,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CurrencyCard
                informations={{
                  title: "Current Price",
                  amount: collateral.usdValue.toLocaleString("en-US", {
                    style: "currency",
                    currency: "usd",
                  }),
                  footer: collateral.token.symbol,
                }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ mb: 1.5 }} />

          <LTVProgressBar
            borrowLimit={0} // TODO: should be dynamic
            value={ltv > ltvMax ? ltvMax : ltv}
            maxLTV={ltvMax}
            recommendedLTV={DEFAULT_LTV_RECOMMENDED} // TODO: Should be dynamic thanks to SDK method
          />

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Typography variant="body2">Details</Typography>

          <br />

          <Grid container justifyContent="space-between">
            <Typography variant="smallDark">Current Loan-to-Value</Typography>

            <Typography variant="small">
              {ltv <= 100 ? `${ltv}%` : "n/a"}
            </Typography>
          </Grid>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Grid container justifyContent="space-between">
            <Typography variant="smallDark">
              LTV liquidation threshold
            </Typography>

            <Typography variant="small">{ltvThreshold}%</Typography>
          </Grid>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="smallDark">
                Collateral will be deposit into
              </Typography>
            </Grid>
            <Grid item>
              {providers?.length ? (
                <Grid container alignItems="center">
                  <NetworkIcon
                    network={vault?.chainId || ""}
                    height={18}
                    width={18}
                  />

                  <Typography ml="0.375rem" variant="small">
                    {providers[0].name}
                  </Typography>
                </Grid>
              ) : (
                "n/a"
              )}
            </Grid>
          </Grid>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Grid container justifyContent="space-between">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="smallDark">Borrow Interest (APR)</Typography>
              <Tooltip
                arrow
                title="APR, or annual percentage rate, represents the price you pay to borrow money."
              >
                <InfoOutlinedIcon
                  sx={{
                    ml: "0.4rem",
                    fontSize: "0.875rem",
                    color: palette.info.dark,
                    display: { xs: "none", sm: "inline" },
                  }}
                />
              </Tooltip>
              <ClickableTooltip
                title="APR, or annual percentage rate, represents the price you pay to borrow money."
                placement="bottom"
              >
                <InfoOutlinedIcon
                  sx={{
                    ml: "0.4rem",
                    fontSize: "0.875rem",
                    color: palette.info.dark,
                  }}
                />
              </ClickableTooltip>
            </div>
            <Box sx={{ alignItems: "center", cursor: "pointer" }}>
              {providers?.length ? (
                <Typography variant="small">
                  {providers[0].name}:{" "}
                  <span style={{ color: palette.success.main }}>
                    {(
                      parseFloat(formatUnits(providers[0].borrowRate, 27)) * 100
                    ).toFixed(2)}
                    %
                  </span>
                </Typography>
              ) : (
                "n/a"
              )}
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

type VaultsMenuProps = {
  vault: BorrowingVault
  routes: RouteMeta[]
  onSelection: (route: RouteMeta) => void
}

function VaultsMenu(props: VaultsMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const select = (route: RouteMeta) => {
    props.onSelection(route)
    setAnchorEl(null)
  }

  if (props.routes.length < 2) {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Chip variant="success" label="A+" />
        <Box display="flex" alignItems="center">
          {providersForRoute(props.routes[0]).map((p) => (
            <ProviderIcon
              key={p.name}
              providerName={p.name}
              height={16}
              width={16}
            />
          ))}
        </Box>
      </Stack>
    )
  }

  return (
    <>
      <Button
        id="button-vaults-menu"
        variant="secondary"
        onClick={open}
        style={{ position: "relative" }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            variant="success"
            label="A+"
            sx={{ ".MuiChip-label": { textOverflow: "clip" } }}
          />
          <Box display="flex" alignItems="center">
            {providersForRoute(props.routes[0])?.map((p) => (
              <ProviderIcon
                key={p.name}
                providerName={p.name}
                height={16}
                width={16}
              />
            ))}
          </Box>
          <KeyboardArrowDownIcon width={16} height={16} />
        </Stack>
      </Button>
      <Menu
        id="vaults-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ "aria-labelledby": "button-vaults-menu" }}
        TransitionComponent={Fade}
      >
        {props.routes.map((r: RouteMeta) => (
          <VaultMenuItem
            key={r.address}
            providers={providersForRoute(r)}
            selected={r.address === props.vault.address.value}
            route={r}
            onClick={() => select(r)}
          />
        ))}
      </Menu>
    </>
  )
}

type VaultMenuItemProps = {
  route: RouteMeta
  providers: LendingProviderDetails[]
  selected: boolean
  onClick: (route: RouteMeta) => void
}
const VaultMenuItem = ({
  route,
  providers,
  selected,
  onClick,
}: VaultMenuItemProps) => {
  return (
    <MenuItem onClick={() => onClick(route)}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Chip variant="success" label="A+" />
        <Box display="flex" alignItems="center">
          {providers.map((p, i) => (
            <Box
              display="flex"
              alignItems="center"
              key={p.name}
              sx={{ right: `${i * 4}px`, position: "relative" }}
            >
              <ProviderIcon
                key={p.name}
                providerName={p.name}
                height={16}
                width={16}
              />
            </Box>
          ))}
        </Box>
        {selected && <CheckIcon />}
      </Stack>
    </MenuItem>
  )
}
