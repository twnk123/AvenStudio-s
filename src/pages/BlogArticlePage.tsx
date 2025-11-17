import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BlogArticle {
  title: string;
  date: string;
  category: string;
  author: string;
  readingTime: string;
  content: {
    introduction: string;
    sections: {
      heading: string;
      content: string;
    }[];
    conclusion?: string;
  };
}

interface BlogArticlesDataMap {
  [key: string]: BlogArticle;
}

const blogArticlesData: BlogArticlesDataMap = {
  'the-future-of-ai-in-digital-marketing': {
    title: 'The Future of AI in Digital Marketing',
    date: 'May 5, 2025',
    category: 'Insights',
    author: 'Emily Carter',
    readingTime: '8 min read',
    content: {
      introduction: 'Artificial Intelligence is revolutionizing how businesses approach digital marketing. From personalized customer experiences to predictive analytics, AI is transforming the marketing landscape in ways we could only imagine a few years ago. As we look toward the future, understanding these emerging trends is crucial for staying competitive in an increasingly digital marketplace.',
      sections: [
        {
          heading: 'AI-Powered Personalization',
          content: 'The era of one-size-fits-all marketing is over. AI enables marketers to deliver hyper-personalized experiences at scale. Machine learning algorithms analyze customer behavior, preferences, and purchase history to create individualized content, product recommendations, and marketing messages. This level of personalization increases engagement rates, improves customer satisfaction, and drives higher conversion rates. Brands that leverage AI for personalization are seeing up to 40% increase in revenue compared to those that don\'t.'
        },
        {
          heading: 'Predictive Analytics',
          content: 'Predictive analytics powered by AI allows marketers to forecast customer behavior, identify trends before they emerge, and optimize marketing spend with unprecedented accuracy. By analyzing vast amounts of historical data, AI models can predict which customers are likely to churn, which products will be popular next season, and which marketing channels will deliver the best ROI. This foresight enables proactive decision-making and more efficient resource allocation.'
        },
        {
          heading: 'Chatbots and Customer Service',
          content: 'AI-powered chatbots have evolved from simple FAQ responders to sophisticated conversational agents capable of handling complex customer inquiries. Modern chatbots use natural language processing to understand context, sentiment, and intent, providing human-like interactions that resolve issues quickly and efficiently. Available 24/7, these virtual assistants improve customer satisfaction while reducing operational costs. The best implementations seamlessly hand off to human agents when needed, creating a hybrid approach that maximizes both efficiency and quality.'
        },
        {
          heading: 'Future Outlook',
          content: 'Looking ahead, AI will continue to reshape digital marketing in profound ways. We can expect even more sophisticated personalization engines, autonomous marketing campaigns that optimize themselves in real-time, and AI-generated content that rivals human creativity. Voice and visual search powered by AI will become mainstream, requiring marketers to adapt their SEO strategies. The key to success will be embracing these technologies while maintaining the human touch that builds genuine connections with customers.'
        }
      ],
      conclusion: 'The future of digital marketing is undeniably intertwined with artificial intelligence. Businesses that invest in AI capabilities now will be well-positioned to lead their industries tomorrow. However, success requires more than just adopting new technologies—it demands a strategic approach that balances automation with authentic human engagement.'
    }
  },
  'the-role-of-artificial-intelligence-in-modern-digital-marketing': {
    title: 'The Role of Artificial Intelligence in Modern Digital Marketing',
    date: 'May 5, 2025',
    category: 'Insights',
    author: 'Michael Rivera',
    readingTime: '7 min read',
    content: {
      introduction: 'In today\'s fast-paced digital landscape, artificial intelligence has become an indispensable tool for marketers. AI is not just a buzzword—it\'s a fundamental shift in how we understand, reach, and engage with audiences. This article explores the multifaceted role AI plays in modern digital marketing strategies.',
      sections: [
        {
          heading: 'Automation at Scale',
          content: 'One of AI\'s most significant contributions to digital marketing is the ability to automate repetitive tasks at scale. Email marketing campaigns can be automatically personalized and optimized for send times. Social media posts can be scheduled and adjusted based on engagement patterns. Ad bidding strategies can be automated to maximize ROI. This automation frees up marketing teams to focus on strategy, creativity, and building meaningful customer relationships rather than getting bogged down in manual tasks.'
        },
        {
          heading: 'Content Creation and Optimization',
          content: 'AI is increasingly being used to assist with content creation, from generating headlines and social media posts to writing entire articles. More importantly, AI tools analyze content performance to determine what resonates with specific audiences. These insights help marketers refine their content strategies, optimize for SEO, and create more engaging material. AI can also personalize content delivery, ensuring each user sees the most relevant information based on their preferences and behavior.'
        },
        {
          heading: 'Customer Insights and Segmentation',
          content: 'Understanding your audience has never been more critical or more complex. AI excels at processing massive datasets to uncover patterns and insights that would be impossible for humans to detect manually. Advanced segmentation algorithms can identify micro-audiences with shared characteristics, enabling highly targeted marketing campaigns. Sentiment analysis tools monitor brand perception across social media and review platforms, providing real-time feedback on marketing initiatives and product launches.'
        }
      ],
      conclusion: 'Artificial intelligence is not replacing marketers—it\'s empowering them. By handling data-intensive tasks and providing actionable insights, AI allows marketing professionals to be more strategic, creative, and effective. The marketers who thrive in this new era will be those who learn to work alongside AI, leveraging its capabilities while bringing uniquely human skills like empathy, creativity, and strategic thinking to the table.'
    }
  },
  'top-digital-marketing-trends-for-2025': {
    title: 'Top Digital Marketing Trends for 2025',
    date: 'May 3, 2025',
    category: 'Marketing',
    author: 'Anna Martinez',
    readingTime: '10 min read',
    content: {
      introduction: 'As we navigate through 2025, the digital marketing landscape continues to evolve at a breakneck pace. Staying ahead of emerging trends is crucial for businesses looking to maintain their competitive edge. Here are the top digital marketing trends shaping the industry this year.',
      sections: [
        {
          heading: 'Trend 1: AI-First Marketing',
          content: 'Artificial intelligence has moved from experimental to essential. In 2025, successful marketing teams are building AI-first strategies that leverage machine learning for everything from content creation to customer service. Generative AI tools are being used to produce marketing copy, design visual assets, and even create video content. However, the most sophisticated marketers are using AI not just for creation, but for optimization—continuously testing and refining campaigns based on AI-driven insights.'
        },
        {
          heading: 'Trend 2: Privacy-Centric Strategies',
          content: 'With the deprecation of third-party cookies and increasing privacy regulations worldwide, marketers are fundamentally rethinking their data strategies. First-party data collection has become paramount, with brands investing heavily in building direct relationships with customers. Contextual advertising is making a comeback, and privacy-preserving technologies like federated learning are enabling personalization without compromising user privacy. Transparency about data usage is no longer optional—it\'s a competitive advantage.'
        },
        {
          heading: 'Trend 3: Short-Form Video Dominance',
          content: 'Short-form video content continues to dominate social media engagement in 2025. Platforms like TikTok, Instagram Reels, and YouTube Shorts are where audiences spend the majority of their time. Brands are investing in vertical video production, working with micro-influencers, and creating authentic, less polished content that resonates with younger demographics. The key is consistency and authenticity—audiences can spot overly produced content from a mile away.'
        },
        {
          heading: 'Trend 4: Voice Search Optimization',
          content: 'Voice search has matured from a novelty to a primary search method for many users. Smart speakers, voice assistants, and voice-enabled devices are changing how people find information and make purchases. Marketers are optimizing for conversational queries, focusing on long-tail keywords and question-based content. Local businesses especially benefit from voice search optimization, as many voice queries are location-based.'
        },
        {
          heading: 'Trend 5: Sustainability Marketing',
          content: 'Consumers, particularly younger generations, are making purchasing decisions based on brand values and environmental impact. Sustainability is no longer a niche concern—it\'s a mainstream expectation. Brands are being transparent about their supply chains, carbon footprints, and social impact initiatives. However, authenticity is crucial. Greenwashing is quickly called out on social media, so any sustainability claims must be backed by genuine action and verifiable results.'
        }
      ],
      conclusion: 'The digital marketing trends of 2025 reflect broader societal shifts toward privacy, authenticity, and sustainability. Success requires not just adopting new technologies, but understanding the human needs and values driving these changes. Marketers who can balance innovation with authenticity, efficiency with empathy, and data-driven insights with creative storytelling will thrive in this dynamic environment.'
    }
  },
  'the-importance-of-user-centered-design': {
    title: 'The Importance of User-Centered Design',
    date: 'May 2, 2025',
    category: 'Design',
    author: 'Sarah Johnson',
    readingTime: '6 min read',
    content: {
      introduction: 'In an increasingly competitive digital landscape, user-centered design has become the differentiating factor between products that succeed and those that fail. It\'s not enough to build something that works—you need to build something that users love to use. User-centered design puts the needs, preferences, and behaviors of users at the heart of the design process.',
      sections: [
        {
          heading: 'What is User-Centered Design?',
          content: 'User-centered design (UCD) is an iterative design process that focuses on understanding users and their needs at every stage of development. Rather than designing based on assumptions or business requirements alone, UCD involves users throughout the process—from initial research and ideation through prototyping and testing. This approach ensures that the final product genuinely solves user problems and provides a delightful experience.'
        },
        {
          heading: 'Why It Matters',
          content: 'The business case for user-centered design is compelling. Products designed with users in mind have higher adoption rates, better retention, and stronger customer loyalty. They require less customer support because they\'re intuitive to use. They generate positive word-of-mouth marketing because users genuinely enjoy the experience. Moreover, identifying and fixing usability issues during the design phase is far less expensive than addressing them after launch. Companies that invest in UCD see significant returns in both customer satisfaction and bottom-line results.'
        },
        {
          heading: 'Key Principles',
          content: 'Effective user-centered design is built on several key principles. First, understand your users through research—surveys, interviews, observation, and analytics. Second, involve users early and often through usability testing and feedback sessions. Third, iterate based on what you learn—design is never truly finished. Fourth, focus on accessibility, ensuring your product can be used by people with diverse abilities. Finally, measure success based on user outcomes, not just business metrics. When users succeed, businesses succeed.'
        },
        {
          heading: 'Implementation Strategies',
          content: 'Implementing user-centered design requires both cultural and practical changes. Start by building empathy within your team through user research sessions and persona development. Create cross-functional teams that include designers, developers, and product managers working together from day one. Establish regular usability testing as part of your development cycle, not an afterthought. Use design systems and pattern libraries to ensure consistency across your product. Most importantly, champion the user perspective in all product decisions, even when it conflicts with short-term business goals.'
        }
      ],
      conclusion: 'User-centered design is not just a methodology—it\'s a philosophy that prioritizes human needs in technology development. As digital products become more complex and competition intensifies, the companies that succeed will be those that make their users\' success the primary measure of their own success.'
    }
  },
  'the-impact-of-artificial-intelligence-on-digital-marketing-strategies': {
    title: 'The Impact of Artificial Intelligence on Digital Marketing Strategies',
    date: 'Apr 28, 2025',
    category: 'Insights',
    author: 'Jason Lee',
    readingTime: '9 min read',
    content: {
      introduction: 'Artificial intelligence is fundamentally reshaping digital marketing strategies across industries. What began as experimental implementations have become core components of successful marketing operations. This transformation is affecting every aspect of how businesses connect with customers, from initial awareness through post-purchase engagement.',
      sections: [
        {
          heading: 'Transforming Customer Experience',
          content: 'AI is enabling unprecedented levels of personalization in customer interactions. Dynamic websites adapt content in real-time based on user behavior and preferences. Email campaigns are automatically personalized not just with names, but with product recommendations, content selections, and timing optimized for each individual recipient. Customer service chatbots provide instant, accurate responses while learning from each interaction to improve over time. The result is a customer experience that feels tailored and responsive, even when serving millions of users simultaneously.'
        },
        {
          heading: 'Data-Driven Decision Making',
          content: 'The amount of data available to marketers has exploded, making it impossible for humans to analyze effectively without AI assistance. Machine learning algorithms process vast datasets to identify patterns, correlations, and insights that inform strategic decisions. Predictive models forecast campaign performance, customer lifetime value, and market trends. Attribution modeling powered by AI helps marketers understand the true impact of each touchpoint in complex customer journeys. This data-driven approach reduces guesswork and enables more confident, evidence-based decision making.'
        },
        {
          heading: 'Marketing Automation',
          content: 'AI-powered marketing automation goes far beyond scheduling emails. Modern platforms use AI to orchestrate entire customer journeys across multiple channels. They determine the optimal next action for each customer based on their behavior, preferences, and predicted needs. Lead scoring algorithms prioritize sales efforts on the most promising opportunities. Content recommendation engines ensure each user sees the most relevant information. This level of automation increases efficiency while actually improving the quality and relevance of customer interactions.'
        },
        {
          heading: 'Challenges and Considerations',
          content: 'Despite its benefits, implementing AI in marketing strategies comes with challenges. Data quality and privacy are paramount concerns—AI is only as good as the data it\'s trained on, and that data must be collected and used ethically. There\'s a learning curve for teams adopting AI tools, requiring investment in training and change management. Over-automation can lead to impersonal experiences if not balanced with human touchpoints. Additionally, AI models can perpetuate biases present in training data, requiring careful monitoring and adjustment.'
        },
        {
          heading: 'Future Implications',
          content: 'Looking forward, AI\'s impact on digital marketing will only deepen. We\'re moving toward predictive and eventually prescriptive marketing, where AI not only forecasts outcomes but recommends optimal strategies. Real-time personalization will become more sophisticated, adapting to micro-moments in customer journeys. Voice and visual search will require new optimization approaches. The marketers who thrive will be those who view AI as a collaborative tool that enhances human creativity and strategic thinking rather than replacing it.'
        }
      ],
      conclusion: 'Artificial intelligence is not a future trend in digital marketing—it\'s the present reality. The impact is comprehensive, touching every aspect of marketing strategy and execution. Success in this AI-augmented landscape requires a balanced approach that leverages technology\'s power while maintaining the human insight, creativity, and empathy that truly connect with customers.'
    }
  },
  'building-a-resilient-business-model-in-uncertain-times': {
    title: 'Building a Resilient Business Model in Uncertain Times',
    date: 'Apr 27, 2025',
    category: 'Business',
    author: 'David Brown',
    readingTime: '11 min read',
    content: {
      introduction: 'In an era characterized by rapid technological change, economic volatility, and global disruptions, business resilience has moved from nice-to-have to essential. A resilient business model doesn\'t just survive challenges—it adapts and emerges stronger. This comprehensive guide explores strategies for building business models that can weather uncertainty and thrive in changing conditions.',
      sections: [
        {
          heading: 'Understanding Business Resilience',
          content: 'Business resilience is the ability to anticipate, prepare for, respond to, and adapt to incremental change and sudden disruptions. It\'s not about avoiding all risks—that\'s impossible—but about building the capacity to absorb shocks and recover quickly. Resilient businesses have diversified revenue streams, adaptable operations, strong financial reserves, and cultures that embrace change. They view uncertainty not as a threat to be feared but as a constant to be planned for.'
        },
        {
          heading: 'Diversification Strategies',
          content: 'Diversification is a cornerstone of business resilience. This doesn\'t mean doing everything—it means not depending on any single customer, supplier, product, or market for survival. Consider diversifying your customer base across different industries, geographies, and segments. Develop multiple product lines or service offerings that appeal to different markets. Build relationships with multiple suppliers to avoid disruption if one fails. Explore different revenue models—subscription, transaction-based, licensing—to create stability. The goal is to ensure that a problem in one area doesn\'t topple your entire business.'
        },
        {
          heading: 'Financial Planning and Reserves',
          content: 'Financial resilience is fundamental to overall business resilience. Maintain healthy cash reserves—experts recommend 3-6 months of operating expenses for small businesses, more for larger organizations. Diversify revenue streams to reduce dependence on any single source. Keep debt at manageable levels and maintain access to credit for emergencies. Implement robust financial monitoring systems that provide early warning of problems. Conduct regular scenario planning to understand how different situations would impact your finances. When times are good, prepare for when they\'re not.'
        },
        {
          heading: 'Technology Adoption',
          content: 'Technology is a key enabler of business resilience. Cloud computing provides flexibility and scalability without major capital investments. Digital tools enable remote work, ensuring operations can continue during physical disruptions. Automation reduces dependence on manual processes that can fail during crises. Data analytics provide insights for faster, better decision-making. Cybersecurity protects against digital threats that could cripple operations. However, technology adoption must be strategic—choose tools that align with your business needs and ensure your team is trained to use them effectively.'
        },
        {
          heading: 'Building Strong Teams',
          content: 'Your people are your greatest asset in building resilience. Hire for adaptability and problem-solving ability, not just technical skills. Cross-train team members so knowledge and capabilities aren\'t siloed in single individuals. Foster a culture that views challenges as opportunities to learn and improve. Communicate transparently about business conditions and challenges. Invest in employee development and wellbeing—resilient teams are made of resilient individuals. When disruption comes, a strong, adaptable team will be your most valuable resource for navigating through it.'
        }
      ],
      conclusion: 'Building a resilient business model is not a one-time project—it\'s an ongoing commitment to preparation, adaptation, and continuous improvement. The strategies outlined here provide a framework, but each business must tailor its approach to its specific context, industry, and risk profile. What remains constant is this: in uncertain times, resilience is the ultimate competitive advantage.'
    }
  },
  'building-a-resilient-startup-key-strategies-for-success': {
    title: 'Building a Resilient Startup: Key Strategies for Success',
    date: 'Apr 25, 2025',
    category: 'Startups',
    author: 'Emily Carter',
    readingTime: '8 min read',
    content: {
      introduction: 'Starting a business is challenging in any environment, but today\'s landscape presents unique obstacles and opportunities. The startups that succeed are those that build resilience into their DNA from day one. This article explores key strategies for creating a startup that can adapt, grow, and thrive despite the inevitable challenges ahead.',
      sections: [
        {
          heading: 'Finding Product-Market Fit',
          content: 'Product-market fit is the foundation of every successful startup. It means building something people actually want and are willing to pay for. Don\'t fall in love with your solution—fall in love with the problem you\'re solving. Talk to potential customers constantly. Build minimum viable products (MVPs) to test assumptions quickly and cheaply. Iterate based on feedback, even when it means pivoting from your original vision. Use data to validate decisions, but don\'t ignore qualitative feedback. The faster you find product-market fit, the less capital you\'ll burn and the stronger your foundation for growth.'
        },
        {
          heading: 'Lean Operations',
          content: 'Startups rarely fail because they run out of good ideas—they fail because they run out of money. Embrace lean principles from the start. Focus spending on activities that directly contribute to finding product-market fit and acquiring customers. Use cloud services and SaaS tools instead of building infrastructure. Outsource non-core functions. Hire slowly and deliberately. Maintain a long runway by keeping burn rate low. This doesn\'t mean being cheap—it means being intentional about every dollar spent. Lean operations give you the time and flexibility to find your path to success.'
        },
        {
          heading: 'Customer-Centric Approach',
          content: 'Your early customers are more than revenue—they\'re partners in building your product. Engage them deeply in your development process. Provide exceptional, personalized service that doesn\'t scale—you can optimize later. Use every customer interaction as a learning opportunity. Build feedback loops into your product and processes. Create community around your product where customers can help each other. These early advocates will not only provide revenue and feedback, but become evangelists who drive organic growth. In the early days, depth of customer relationships matters more than breadth.'
        },
        {
          heading: 'Funding Strategies',
          content: 'Funding strategy should align with your business model and growth stage. Bootstrap as long as possible to maintain control and prove your concept. When seeking outside funding, choose investors who bring more than money—look for industry expertise, networks, and strategic guidance. Understand the trade-offs of different funding sources—venture capital brings resources but also expectations and timeline pressure. Consider alternatives like revenue-based financing or strategic partnerships. Whatever path you choose, raise more than you think you need—fundraising takes longer and is more difficult than expected, and you don\'t want to fundraise from a position of desperation.'
        },
        {
          heading: 'Building Your Team',
          content: 'Early team members set the culture and trajectory of your startup. Hire for values fit and adaptability as much as skills—you can teach skills but not attitude. Seek people who are comfortable with ambiguity and rapid change. Offer equity to align incentives and compensate for below-market salaries. Be transparent about the challenges and risks—you want people joining with eyes open. Create a culture of ownership where everyone feels responsible for success. Invest in team development and wellbeing even when resources are tight. Your people will make or break your startup—choose and nurture them wisely.'
        }
      ],
      conclusion: 'Building a resilient startup requires balancing seemingly contradictory demands—moving fast but being thoughtful, thinking big but starting small, being confident but staying humble. The strategies outlined here provide a framework, but ultimately success comes from relentless focus on creating value for customers, learning from failures, and adapting to changing conditions. The startup journey is difficult, but with resilience built into your foundation, you dramatically increase your odds of being one of the success stories.'
    }
  }
};

const BlogArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? blogArticlesData[slug] : null;

  // Get 3 random other articles for "Related Articles" section
  const getRelatedArticles = () => {
    if (!slug) return [];
    const otherSlugs = Object.keys(blogArticlesData).filter(s => s !== slug);
    const shuffled = otherSlugs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(s => ({ slug: s, ...blogArticlesData[s] }));
  };

  const relatedArticles = getRelatedArticles();

  if (!article) {
    return (
      <div className="pt-20 min-h-screen" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
        <div className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <Link
              to="/blog"
              className="mb-8 inline-block hover:underline"
              style={{ color: 'rgb(245, 87, 51)' }}
            >
              ← Back to Blog
            </Link>
            <div className="text-center py-20">
              <h1 className="font-geist text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
                Article Not Found
              </h1>
              <p className="text-lg mb-8" style={{ color: 'rgb(117, 117, 117)' }}>
                The article you're looking for doesn't exist.
              </p>
              <Link
                to="/blog"
                className="inline-block px-8 py-3 rounded-full font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: 'rgb(245, 87, 51)', color: 'white' }}
              >
                View All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
      <article className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Link
            to="/blog"
            className="mb-8 inline-block hover:underline"
            style={{ color: 'rgb(245, 87, 51)' }}
          >
            ← Back to Blog
          </Link>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
              <span style={{ color: 'rgb(117, 117, 117)' }}>{article.date}</span>
              <span style={{ color: 'rgb(117, 117, 117)' }}>•</span>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: 'rgb(245, 87, 51)', color: 'white' }}
              >
                {article.category}
              </span>
              <span style={{ color: 'rgb(117, 117, 117)' }}>•</span>
              <span style={{ color: 'rgb(117, 117, 117)' }}>By {article.author}</span>
              <span style={{ color: 'rgb(117, 117, 117)' }}>•</span>
              <span style={{ color: 'rgb(117, 117, 117)' }}>{article.readingTime}</span>
            </div>

            <h1 className="font-geist text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight" style={{ color: 'rgb(66, 66, 66)' }}>
              {article.title}
            </h1>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div
              className="aspect-video rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgb(245, 87, 51) 0%, rgb(66, 66, 66) 100%)'
              }}
            />
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Introduction */}
            <p className="text-xl leading-relaxed mb-8" style={{ color: 'rgb(66, 66, 66)' }}>
              {article.content.introduction}
            </p>

            {/* Sections */}
            {article.content.sections.map((section, index) => (
              <div key={index} className="mb-10">
                <h2 className="font-geist text-2xl md:text-3xl font-bold mb-4 mt-8" style={{ color: 'rgb(66, 66, 66)' }}>
                  {section.heading}
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: 'rgb(117, 117, 117)' }}>
                  {section.content}
                </p>
              </div>
            ))}

            {/* Conclusion */}
            {article.content.conclusion && (
              <div className="mt-12 p-8 rounded-2xl" style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
                <h2 className="font-geist text-2xl md:text-3xl font-bold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
                  Conclusion
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: 'rgb(117, 117, 117)' }}>
                  {article.content.conclusion}
                </p>
              </div>
            )}
          </motion.div>

          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t"
            style={{ borderColor: 'rgb(242, 242, 242)' }}
          >
            <p className="font-geist font-semibold mb-4" style={{ color: 'rgb(66, 66, 66)' }}>
              Share this article
            </p>
            <div className="flex gap-3">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: 'rgb(242, 242, 242)', color: 'rgb(66, 66, 66)' }}
                aria-label="Share on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </button>
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: 'rgb(242, 242, 242)', color: 'rgb(66, 66, 66)' }}
                aria-label="Share on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </button>
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: 'rgb(242, 242, 242)', color: 'rgb(66, 66, 66)' }}
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-20 pt-12 border-t"
              style={{ borderColor: 'rgb(242, 242, 242)' }}
            >
              <h2 className="font-geist text-3xl font-bold mb-8" style={{ color: 'rgb(66, 66, 66)' }}>
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.slug}`}
                    className="group"
                  >
                    <div
                      className="aspect-video rounded-xl mb-4 transition-all group-hover:shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgb(245, 87, 51) 0%, rgb(66, 66, 66) 100%)'
                      }}
                    />
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                      style={{ backgroundColor: 'rgb(242, 242, 242)', color: 'rgb(66, 66, 66)' }}
                    >
                      {related.category}
                    </span>
                    <h3 className="font-geist text-lg font-bold mb-2 group-hover:underline" style={{ color: 'rgb(66, 66, 66)' }}>
                      {related.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgb(117, 117, 117)' }}>
                      {related.readingTime}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogArticlePage;
