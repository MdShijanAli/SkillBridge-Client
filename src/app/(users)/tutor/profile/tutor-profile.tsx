"use client";

import { useState } from "react";
import {
  User,
  Mail,
  DollarSign,
  Camera,
  GraduationCap,
  Globe,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentTutor } from "@/lib/data";
import { toast } from "sonner";

const TutorProfile = ({ userData }: { userData: any }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    title: userData.title,
    bio: userData.bio,
    hourlyRate: currentTutor.hourlyRate,
    education: currentTutor.education,
    experience: currentTutor.experience,
  });

  const [subjects, setSubjects] = useState(currentTutor.subjects);
  const [languages, setLanguages] = useState(currentTutor.languages);
  const [newSubject, setNewSubject] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const addSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setNewSubject("");
    }
  };

  const removeSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject));
  };

  const addLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage("");
    }
  };

  const removeLanguage = (language: string) => {
    setLanguages(languages.filter((l) => l !== language));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Edit Tutor Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Section */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                    <AvatarImage src={currentTutor.avatar} />
                    <AvatarFallback className="text-2xl">
                      {currentTutor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Camera className="w-4 h-4 text-primary-foreground" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {currentTutor.name}
                  </h3>
                  <p className="text-sm text-primary">{currentTutor.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="badge-completed">Verified</Badge>
                    <span className="text-sm text-muted-foreground">
                      {currentTutor.totalSessions} sessions completed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-foreground">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hourlyRate: parseInt(e.target.value),
                        })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={4}
                  placeholder="Tell students about yourself..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    value={formData.education}
                    onChange={(e) =>
                      setFormData({ ...formData, education: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="glass-card rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Subjects
              </h2>

              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant="secondary"
                    className="pl-3 pr-1 py-1"
                  >
                    {subject}
                    <button
                      type="button"
                      onClick={() => removeSubject(subject)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a subject..."
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addSubject())
                  }
                />
                <Button type="button" onClick={addSubject}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Languages */}
            <div className="glass-card rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Languages
              </h2>

              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <Badge
                    key={language}
                    variant="secondary"
                    className="pl-3 pr-1 py-1"
                  >
                    <Globe className="w-3 h-3 mr-1" />
                    {language}
                    <button
                      type="button"
                      onClick={() => removeLanguage(language)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a language..."
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addLanguage())
                  }
                />
                <Button type="button" onClick={addLanguage}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" variant="hero">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TutorProfile;
