// src/pages/ArticleDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const ArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticleDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://dev.to/api/articles/${id}`);
      setArticle(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch article details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleDetails();
  }, [id]);

  if (loading) return <Loading />;

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg inline-block">
          <p className="font-bold">Error</p>
          <p>{error || "Article not found"}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-900 hover:text-blue-700 mb-6 transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        {/* Article Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Cover Image */}
          {article.cover_image && (
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(() => {
                const tags = article?.tag_list
                  ? Array.isArray(article.tag_list)
                    ? article.tag_list
                    : typeof article.tag_list === "string"
                    ? article.tag_list
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                    : []
                  : [];

                return tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-600 text-sm px-4 py-2 rounded-full font-semibold"
                  >
                    #{tag}
                  </span>
                ));
              })()}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
              {article.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    article.user?.profile_image ||
                    "https://via.placeholder.com/64"
                  }
                  alt={article.user?.name || "Author"}
                  className="w-16 h-16 rounded-full border-4 border-purple-200"
                />
                <div>
                  <p className="text-lg font-bold text-gray-800">
                    {article.user?.name || "Unknown Author"}
                  </p>
                  <p className="text-gray-600">
                    {article.readable_publish_date
                      ? `Published on ${article.readable_publish_date}`
                      : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">
                  {article.reading_time_minutes} min read
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-xl mr-2">❤️</span>
                <span className="font-semibold">
                  {article.public_reactions_count} reactions 
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-xl mr-2">💬</span>
                <span className="font-semibold">
                  {article.comments_count} comments
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none mb-8">
              <p className="text-xl text-gray-700 leading-relaxed">
                {article.description}
              </p>
            </div>

            {/* Read on DEV.to Button */}
            <div className="bg-[#F9F4EC] p-8 rounded-xl text-center">
              <p className="text-black  mb-4">
                Want to read the full article with code examples and detailed
                explanations?
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-950 text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition font-semibold text-lg"
              >
                Read Full Article on DEV.to →
              </a>
            </div>

            {/* Organization Info */}
            {article.organization && (
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">Published by</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      article.organization?.profile_image ||
                      "https://via.placeholder.com/48"
                    }
                    alt={article.organization?.name || "Organization"}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">
                      {article.organization?.name || ""}
                    </p>
                    <p className="text-sm text-gray-600">
                      @{article.organization?.username || ""}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
