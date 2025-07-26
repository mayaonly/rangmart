import { IMenuData } from "@/types/menu-d-t";

const menu_data:IMenuData[] = [
  {
    id:1,
    name:'Home',
    link:'/',
  },
  {
    id:2,
    name:'Shop',
    link:'/search',
  },
  {
    id:3,
    name:'Blog',
    link:'/blog',
  },
  {
    id:5,
    name:'About Us',
    link:'/about',
  },
  {
    id:6,
    name:'Contact Us',
    link:'/contact',
  },
]

export default menu_data;

// mobile menus 
export const mobile_menus = [
  {
    id:1,
    name:'Home',
    link:'/',
    has_dropdown:true,
    home_menus:[
      {title:'Home',img:'/assets/img/header/home1-1.jpg',link:'/'},
    ]
  },
  {
    id:2,
    name:'Shop',
    link:'/shop',
    has_dropdown:true,
    dropdown_menus:[
      {title:'Shop',link:'/search'},
    ]
  },
  {
    id:4,
    name:'Blog',
    link:'/blog',
    has_dropdown:true,
    dropdown_menus:[
      {title:'Blog',link:'/blog'},
    ]
  },
  {
    id:6,
    name:'About Us',
    link:'/about',
  },
  {
    id:7,
    name:'Contact Us',
    link:'/contact',
  },
]