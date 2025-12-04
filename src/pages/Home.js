// src/pages/Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import Loading from "../components/Loading";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://dev.to/api/articles");
      setArticles(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch articles. Please try again later.");
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tag_list.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg inline-block">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={fetchArticles}
            className="mt-4 bg-red-500 text-black px-6 py-2 rounded-lg hover:text-orange-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#F9F4EC]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r bg-[#F9F4EC]  text-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in font-merriweather">
            Welcome to DevBlog
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-playwriteUSTrad">
            Discover the latest articles, tutorials, and insights from the
            developer community
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
              />
              <svg
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16">


          {/* <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-black mb-2">
              {articles.length}
            </div>
            <div className="text-gray-600">Total Articles</div>
          </div> */}

          {/* <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              {articles.reduce(
                (sum, article) => sum + article.public_reactions_count,
                0
              )}
            </div>
            <div className="text-gray-600">Total Reactions</div>
          </div> */}


          {/* <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-pink-600 mb-2">
              {articles.reduce(
                (sum, article) => sum + article.comments_count,
                0
              )}
            </div>
            <div className="text-gray-600">Total Comments</div>
          </div> */}


        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Latest Articles
            {searchTerm && (
              <span className="text-black ml-2">
                ({filteredArticles.length} results)
              </span>
            )}
          </h2>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600">
              No articles found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
