"use client";

import Dashboard from "./Dashboard";
import Grid from "@mui/material/Grid";
import FeaturedPost from "./FeturePost";
import MainDashboard from "./MainDashboard";
import Sidebar from "./Sidebar";
import Layout from "../layout/Layout";

const mainFeaturedPost = {
    title: 'Welcome to JLog',
    description:
        "개발자",
    image: 'https://source.unsplash.com/random?nature',
    imageText: 'main image description',
    linkText: 'Github',

};

const featuredPosts = [
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random?nature',
        imageLabel: 'Image Text',
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random?nature',
        imageLabel: 'Image Text',
    },
];

    const sidebar = {
        title: '일정',
        archives: [
            { title: 'March 2020', url: '#' },
            { title: 'February 2020', url: '#' },
            { title: 'January 2020', url: '#' },
            { title: 'November 1999', url: '#' },
            { title: 'October 1999', url: '#' },
            { title: 'September 1999', url: '#' },
            { title: 'August 1999', url: '#' },
            { title: 'July 1999', url: '#' },
            { title: 'June 1999', url: '#' },
            { title: 'May 1999', url: '#' },
            { title: 'April 1999', url: '#' },
        ],

    };

export default function Home() {
    return (
        <Layout>
            <Dashboard post={mainFeaturedPost} />
            <Grid container spacing={4}>
                {featuredPosts.map((post) => (
                    <FeaturedPost key={post.title} post={post} />
                ))}
            </Grid>
            <Grid container spacing={5} sx={{ mt: 3 }}>
            <MainDashboard title="미정" />
            <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
            />
            </Grid>
        </Layout>
    );
}