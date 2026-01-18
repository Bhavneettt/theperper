-- Seed data for The Perspective
-- Run this after creating the schema

-- Insert Categories
INSERT INTO "Category" ("id", "name", "slug", "description", "color") VALUES
('cat_tech', 'Technology & Innovation', 'technology', 'Where ideas meet impact', '#137fec'),
('cat_leadership', 'Business & Leadership', 'leadership', 'Beyond boardrooms and balance sheets', '#137fec'),
('cat_sustainability', 'Sustainability & Purpose', 'sustainability', 'The business of doing good', '#137fec'),
('cat_culture', 'Work & Culture', 'culture', 'Inside the evolving workplace', '#137fec'),
('cat_consumer', 'Consumer & Lifestyle Trends', 'consumer', 'From insight to instinct', '#137fec'),
('cat_policy', 'Policy & Public Discourse', 'policy', 'Where industry meets society', '#137fec'),
('cat_education', 'Education & Future Skills', 'education', 'Learning redefined', '#137fec'),
('cat_health', 'Health & Wellbeing', 'health', 'A human-first lens on healthcare', '#137fec')
ON CONFLICT ("id") DO NOTHING;

-- Insert a sample user/contributor
INSERT INTO "User" ("id", "email", "name", "role", "bio") VALUES
('user_1', 'contributor@theperspective.com', 'David Chen', 'CONTRIBUTOR', 'CTO and thought leader in technology innovation')
ON CONFLICT ("email") DO NOTHING;

-- Insert sample tags
INSERT INTO "Tag" ("id", "name", "slug") VALUES
('tag_1', 'AI', 'ai'),
('tag_2', 'Leadership', 'leadership'),
('tag_3', 'Innovation', 'innovation'),
('tag_4', 'Remote Work', 'remote-work'),
('tag_5', 'Sustainability', 'sustainability')
ON CONFLICT ("id") DO NOTHING;

-- Insert a sample poll
INSERT INTO "Poll" ("id", "question", "active") VALUES
('poll_1', 'Is AI currently increasing or decreasing your team''s productivity?', true)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "PollOption" ("id", "text", "pollId") VALUES
('opt_1', 'Increasing significantly', 'poll_1'),
('opt_2', 'No noticeable change', 'poll_1'),
('opt_3', 'Decreasing (Learning curve)', 'poll_1')
ON CONFLICT ("id") DO NOTHING;
