import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuIcon from '@mui/icons-material/Menu';

export const NAV_OPTIONS = {
    EXPLORER:{
        label: "Explore",
        icon: ExploreIcon,
        component: <></>
    },
    SEARCH:{
        label: "Search",
        icon: SearchIcon,
        component: <>Search</>

    },
    SAVES:{
        label:"Saves",
        icon: BookmarkIcon,
        component: <>Saves</>

    },
    CHAT:{
        label: "RegulonDB-GPT",
        icon: AutoAwesomeIcon,
        component: <>GPT</>

    },
    MENU:{
        label: "Browse",
        icon: MenuIcon,
        component: <>Menu</>
    }
}