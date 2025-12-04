// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedArticles, setSavedArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://dev.to/api/articles?per_page=6"
      );
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  const loadSavedArticles = () => {
    const saved =
      localStorage.getItem(`savedArticles_${currentUser?.uid}`) || "[]";
    setSavedArticles(JSON.parse(saved));
  };

  useEffect(() => {
    fetchArticles();
    loadSavedArticles();
  }, [currentUser?.uid]);

  const toggleSaveArticle = (articleId) => {
    let updated;
    if (savedArticles.includes(articleId)) {
      updated = savedArticles.filter((id) => id !== articleId);
    } else {
      updated = [...savedArticles, articleId];
    }
    setSavedArticles(updated);
    localStorage.setItem(
      `savedArticles_${currentUser?.uid}`,
      JSON.stringify(updated)
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#F9F4EC]">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={currentUser?.photoURL || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-200"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-950 mb-2">
                Welcome back, {currentUser?.displayName || "Developer"}
              </h1>
              <p className="text-gray-600 mb-3">{currentUser?.email}</p>
              <div className="flex items-center space-x-4">
                <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                  ✓ Verified
                </span>
                <span className="text-gray-500 text-sm">
                  Member since{" "}
                  {new Date(
                    currentUser?.metadata.creationTime
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Saved Articles",
              value: savedArticles.length,
            },
            {
              title: "Reading Time",
              value: "24h",
            },
            {
              title: "Articles Read",
              value: "42",
            },
            {
              title: "Streak Days",
              value: "7",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-lg h-36 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-black">{card.value}</p>
              </div>
              <div className="text-3xl text-gray-300"> </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/"
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:bg-[#EFE8DC] transition"
            >
              <span className="text-sm font-semibold text-gray-700">
                Browse Articles
              </span>
            </Link>
            <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:bg-[#EFE8DC] transition">
              <span className="text-sm font-semibold text-gray-700">
                Favorites
              </span>
            </button>
            <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:bg-[#EFE8DC] transition">
              <span className="text-sm font-semibold text-gray-700">
                Write Article
              </span>
            </button>
            <button className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:bg-[#EFE8DC] transition">
              <span className="text-sm font-semibold text-gray-700">
                Settings
              </span>
            </button>
          </div>
        </div>

        {/* Recommended Articles */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition flex flex-col h-full"
              >
                {article.cover_image && (
                  <div className="h-32 w-full overflow-hidden rounded-lg mb-3">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-wrap gap-1 mb-2">
                  {(Array.isArray(article.tag_list)
                    ? article.tag_list.slice(0, 2)
                    : []
                  ).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#F9F4EC] text-blue-950 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-blue-950 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-black mb-3 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <Link
                    to={`/article/${article.id}`}
                    className="text-blue-950 font-semibold text-sm hover:underline"
                  >
                    Read More →
                  </Link>
                  <button
                    onClick={() => toggleSaveArticle(article.id)}
                    className="text-sm text-gray-700 hover:text-blue-900 transition"
                  >
                    {savedArticles.includes(article.id) ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
