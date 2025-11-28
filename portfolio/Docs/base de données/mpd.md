```sql

CREATE TABLE projects (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
img VARCHAR(255) NOT NULL,
technologies TEXT[] NOT NULL,
creation_date DATE NOT NULL,
git_url VARCHAR(255) NOT NULL,
live_url VARCHAR(255),
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

```

```sql
CREATE EXRENSION IF NOT EXISTS "pgcrypto"
```

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
```
