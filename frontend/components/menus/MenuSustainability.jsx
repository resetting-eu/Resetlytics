
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

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PollRoundedIcon from '@mui/icons-material/PollRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';

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
        <StyledTreeItem nodeId="4" labelText="Enterprise" labelIcon={BusinessRoundedIcon}
        color="#1a73e8"
        bgColor="#e8f0fe"
        colorForDarkMode="#B8E7FB"
        bgColorForDarkMode="#071318" 
        />
        <StyledTreeItem nodeId="5" labelText="Economy" labelIcon={EuroRoundedIcon} 
        color="#1a73e8"
        bgColor="#e8f0fe"
        colorForDarkMode="#B8E7FB"
        bgColorForDarkMode="#071318"
        />
        <StyledTreeItem nodeId="6" labelText="Social" labelIcon={GroupsRoundedIcon} 
        color="#1a73e8"
        bgColor="#e8f0fe"
        colorForDarkMode="#B8E7FB"
        bgColorForDarkMode="#071318"
        />
        <StyledTreeItem nodeId="7" labelText="Environment" labelIcon={CloudQueueRoundedIcon} 
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

// export default function BasicTabs({dict, isAuthenticated}) {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   var tabSX = {
//     "&.Mui-selected": { color: "#46b3c2" },
//     textTransform: 'capitalize',
//     fontSize: 18,
//     fontFamily: 'inter',
//     fontWeight: 500,
//     color: 'black',
//     "&:hover": {
//       color: "#46b3c2",
//     },
//   }

//   return (
//     <Box sx={{ width: '100%', textAlign: 'center' }}>
//       <Box display="flex"
//     justifyContent="center"
//     alignItems="center" sx={{ pb: '4vh', }}>
//         <Tabs value={value} onChange={handleChange}
//           TabIndicatorProps={{
//             style: {
//               backgroundColor: "#46b3c2",
//             }
//           }}
//           variant="scrollable"
//           scrollButtons="auto"
//           >
//           <Tab label="Enterprise Management" sx={tabSX} />
//           <Tab label="Economic Value" sx={tabSX} />
//           <Tab label="Social and Cultural Impact" sx={tabSX} />   
//           <Tab label="Environmental Impact" sx={tabSX} />
//         </Tabs>
//       </Box>

//       {
//         Object.keys(dict).map(function (key) {
//           console.log(dict[key])
//           if (dict[key].dimension == "Enterprise  Management") {
//             return selectOptionType(isAuthenticated, dict[key], value, 0)
//           } else if (dict[key].dimension == "Economic Value") {
//             return selectOptionType(isAuthenticated, dict[key], value, 1)
//           } else if (dict[key].dimension == "Social and Cultural Impact") {
//             return selectOptionType(isAuthenticated, dict[key], value, 2)
//           } else if (dict[key].dimension == "Environmental Impact") {
//             return selectOptionType(isAuthenticated, dict[key], value, 3)
//           }
//         })}
//     </Box>
//   );
// }



