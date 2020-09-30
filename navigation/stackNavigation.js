import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/home/index'
import ProductList from '../screens/products/index'
import Category from '../screens/products/categoty/index'
import SubCategory from '../screens/products/categoty/SubCategory/index'
import Footer from '../screens/home/footer/footer'
import ProductFilter from '../screens/products/filter/index'
import BrandList from '../screens/brands/brandList/index'
import BrandBody from '../screens/brands/brandBody'
import SplashScreen from '../screens/home/splashScreen'
import Login from '../screens/user/login/index'
import SideBar from '../screens/home/sideBar/sideBar'
import Product from '../screens/products/product/index'
import SignUp from '../screens/user/signUp/index'
import Cart from '../screens/products/Cart/index'
import Address from '../screens/user/address/index'
import AddAddress from '../screens/user/address/addAddress/index'
import Checkout from '../screens/products/checkout/index'
import Wishlist from '../screens/products/wishList/index'
const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="sideBar" component={SideBar} />
            <Stack.Screen options={{ headerShown: false }} name="login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="address" component={Address}/>
            <Stack.Screen options={{ headerShown: false }} name="signUp" component={SignUp} />
            <Stack.Screen options={{ headerShown: false }} name="SplashScreen" component={SplashScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Footer" component={Footer} />
            <Stack.Screen options={{ headerShown: false }} name="ProductList" component={ProductList} />
            <Stack.Screen options={{ headerShown: false }} name="AddAddress" component={AddAddress} />
            <Stack.Screen options={{ headerShown: false }} name="CheckOut" component={Checkout} />
            <Stack.Screen options={{ headerShown: false }} name="Wishlist" component={Wishlist} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen options={{ headerShown: false }} name="Shopping Cart" component={Cart} />
            <Stack.Screen name="ProductFilter" component={ProductFilter} />
            <Stack.Screen options={({ route }) => ({ title: route.params.title, headerTitleStyle: { alignSelf: 'center', marginRight: '15%' }, })} name="SubCategory" component={SubCategory} />
            <Stack.Screen options={{ headerShown: false }} name="Product" component={Product} />
            <Stack.Screen options={{ headerShown: false }} name="Brands" component={BrandList} />
            <Stack.Screen options={{ headerShown: false }} name="BrandBody" component={BrandBody} />
        </Stack.Navigator>
    );
}

const BrandStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="BrandBody" component={BrandBody} />
        </Stack.Navigator>
    );
}

const CartStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Shopping Cart" component={Cart} />
        </Stack.Navigator>
    );
}

const UserStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="login" component={Login} />
        </Stack.Navigator>
    );
}

const WishListStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="wishList" component={Wishlist} />
        </Stack.Navigator>
    );
}



export { MainStackNavigator, BrandStackNavigator, CartStackNavigator, UserStackNavigator,WishListStackNavigator };