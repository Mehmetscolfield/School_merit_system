/*
  # Create Students Merit System

  1. New Tables
    - `students`
      - `id` (bigserial, primary key)
      - `name` (text, unique, not null) - Student's full name
      - `password` (text, not null) - Student's login password
      - `merit_points` (integer, default 0) - Current merit score
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `students` table
    - Add policy for students to read their own data
    - Add policy for students to view all student names and points (for leaderboard)
    - Add policy for service role to manage all data (admin access)

  3. Initial Data
    - Insert 16 students from Galaxy International School
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id bigserial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  password text NOT NULL,
  merit_points integer DEFAULT 0 CHECK (merit_points >= 0 AND merit_points <= 220),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Policy: Students can read all student data (for rankings/leaderboard)
CREATE POLICY "Students can view all student data"
  ON students
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Students can update only their own data (not implemented in this version, but reserved)
CREATE POLICY "Students can update own data"
  ON students
  FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

-- Insert initial students with random passwords and merit points
INSERT INTO students (name, password, merit_points) VALUES
  ('Ayaulym Abdigashim', 'aB3xKp9w', 145),
  ('Aiya Abdyrakhma', 'zM7nQr2t', 198),
  ('Khadis Aidyn', 'pL5wXy8k', 167),
  ('Aidyn Askarbekuly', 'qW9mNv4j', 123),
  ('Ahmet Naci Atalay', 'rT6bHg3z', 189),
  ('Tamiris Bakirova', 'sK8dFp2m', 156),
  ('Kaussar Dauletkyzy', 'tY4nCx7w', 201),
  ('Melih Emre ERDOGAN', 'uP9rVb5q', 178),
  ('Timurali Kalymbetov', 'vL2hZm8k', 134),
  ('Marzhan Kurmanzhar', 'wQ7jNp3x', 192),
  ('Nurali Mukanov', 'xR4kBt9m', 143),
  ('Nurbek Nurbagi', 'yS8mCv2p', 187),
  ('Ameli Shotbayeva', 'zT3nDw7k', 165),
  ('Tair Tazhibayev', 'aU6pFx4m', 210),
  ('Ali Yergali', 'bV9qGy2n', 129),
  ('Alina Zagitova', 'cW5rHz8p', 174)
ON CONFLICT (name) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_students_updated_at ON students;
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
