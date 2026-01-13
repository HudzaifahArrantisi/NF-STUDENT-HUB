// models/profile.go
package models

import "time"

type Profile struct {
    ID              int       `json:"id"`
    UserID          int       `json:"user_id"`
    Name            string    `json:"name"`
    Username        string    `json:"username,omitempty"`
    Bio             string    `json:"bio,omitempty"`
    Website         string    `json:"website,omitempty"`
    Phone           string    `json:"phone,omitempty"`
    ProfilePicture  string    `json:"profile_picture,omitempty"`
    FollowersCount  int       `json:"followers_count"`
    FollowingCount  int       `json:"following_count"`
    Role            string    `json:"role"` // admin, ukm, ormawa
    CreatedAt       time.Time  `json:"created_at"`
    UpdatedAt       time.Time  `json:"updated_at"`
}