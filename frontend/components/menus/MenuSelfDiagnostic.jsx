import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Grid, Card, CardContent, CardHeader } from '@mui/material';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';

import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import PollRoundedIcon from '@mui/icons-material/PollRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

const StyledTreeItem = React.forwardRef(function StyledTreeItem(props, ref) {
  const theme = useTheme();
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const styleProps = {
    '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
    '--tree-view-bg-color':
      theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
  };

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 0.5,
            pr: 0,
          }}
        >
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          {/* <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography> */}
        </Box>
      }
      style={styleProps}
      {...other}
      ref={ref}
    />
  );
});

const info = {title: "Monitoring Service Quality", description: "description"}



export default function GmailTreeView({dict, isAuthenticated}) {
  return (
    <Grid container>
    <Grid item xs={8}>
      <Card>
          <CardHeader title={info.title}/>
          <CardContent>
            <Typography variante="body2" color="text.secondary">
              {info.description}
            </Typography>
          </CardContent>
      </Card>
    </Grid>
    <Grid item xs={4}>
    <TreeView
      aria-label="gmail"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <StyledTreeItem nodeId="1" labelText="Questionnaire" labelIcon={QuestionAnswerRoundedIcon} />
      <StyledTreeItem nodeId="2" labelText="Survey" labelIcon={PollRoundedIcon} />
      <StyledTreeItem nodeId="3" labelText="Outcome" labelIcon={QueryStatsRoundedIcon}>
      <StyledTreeItem
          nodeId="4"
          labelText="Economy" labelIcon={EuroRoundedIcon} 
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
          colorForDarkMode="#B8E7FB"
          bgColorForDarkMode="#071318"
        />
      <StyledTreeItem nodeId="5" labelText="Social" labelIcon={GroupsRoundedIcon} 
      labelInfo="90"
      color="#1a73e8"
      bgColor="#e8f0fe"
      colorForDarkMode="#B8E7FB"
      bgColorForDarkMode="#071318"
      />
      <StyledTreeItem nodeId="6" labelText="Environment" labelIcon={CloudQueueRoundedIcon} 
      labelInfo="90"
      color="#1a73e8"
      bgColor="#e8f0fe"
      colorForDarkMode="#B8E7FB"
      bgColorForDarkMode="#071318"
      />
      <StyledTreeItem nodeId="7" labelText="Demographics" labelIcon={GroupsRoundedIcon} 
      labelInfo="90"
      color="#1a73e8"
      bgColor="#e8f0fe"
      colorForDarkMode="#B8E7FB"
      bgColorForDarkMode="#071318"
      />
      </StyledTreeItem>
    </TreeView>
    </Grid></Grid>
  );
}
