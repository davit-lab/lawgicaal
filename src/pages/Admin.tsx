import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContent, useAdminAuth, resetContent } from "@/hooks/useDatabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { SiteContent } from "@/lib/types";
import { 
  LogOut, 
  Save, 
  RotateCcw, 
  Building2, 
  Home, 
  Users, 
  Briefcase, 
  Shield, 
  Gavel, 
  Globe,
  Plus,
  Trash2,
  Lock
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Home,
  Briefcase,
  Shield,
  Gavel,
  Globe,
};

function LoginForm({ onLogin }: { onLogin: (u: string, p: string) => Promise<boolean> }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await onLogin(username, password);
    setIsLoading(false);
    if (success) {
      toast.success("წარმატებით შეხვედით ადმინ პანელში");
    } else {
      toast.error("არასწორი მომხმარებელი ან პაროლი");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-lg bg-gold flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-black" />
          </div>
          <CardTitle className="text-gold">ადმინ პანელი</CardTitle>
          <CardDescription>შეიყვანეთ მომხმარებელი და პაროლი</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>მომხმარებელი</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
              />
            </div>
            <div className="space-y-2">
              <Label>პაროლი</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
              />
            </div>
            <Button type="submit" className="w-full bg-gold text-black hover:bg-gold-light" disabled={isLoading}>
              {isLoading ? "იტვირთება..." : "შესვლა"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Default: admin / admin123
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function CompanySection({ content, updateContent }: { 
  content: SiteContent; 
  updateContent: (c: SiteContent) => void;
}) {
  const handleChange = (field: keyof typeof content.company, value: string) => {
    updateContent({
      ...content,
      company: { ...content.company, [field]: value },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>კომპანიის სახელი</Label>
          <Input
            value={content.company.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>სლოგანი</Label>
          <Input
            value={content.company.slogan}
            onChange={(e) => handleChange("slogan", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>აღწერა</Label>
        <Textarea
          value={content.company.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>ელ-ფოსტა</Label>
          <Input
            value={content.company.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>ტელეფონი 1</Label>
          <Input
            value={content.company.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>ტელეფონი 2</Label>
          <Input
            value={content.company.phone2}
            onChange={(e) => handleChange("phone2", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>მისამართი</Label>
          <Input
            value={content.company.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Facebook</Label>
          <Input
            value={content.company.facebook}
            onChange={(e) => handleChange("facebook", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Instagram</Label>
          <Input
            value={content.company.instagram}
            onChange={(e) => handleChange("instagram", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function HomeSection({ content, updateContent }: { 
  content: SiteContent; 
  updateContent: (c: SiteContent) => void;
}) {
  const handleChange = (field: keyof typeof content.home, value: string | object) => {
    updateContent({
      ...content,
      home: { ...content.home, [field]: value },
    });
  };

  const handleStatChange = (field: keyof typeof content.home.stats, value: string) => {
    updateContent({
      ...content,
      home: { ...content.home, stats: { ...content.home.stats, [field]: value } },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Hero სათაური</Label>
        <Input
          value={content.home.heroTitle}
          onChange={(e) => handleChange("heroTitle", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Hero ქვესათაური</Label>
        <Textarea
          value={content.home.heroSubtitle}
          onChange={(e) => handleChange("heroSubtitle", e.target.value)}
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <Label>Hero სლოგანი</Label>
        <Input
          value={content.home.heroSlogan}
          onChange={(e) => handleChange("heroSlogan", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>CTA ტექსტი</Label>
        <Input
          value={content.home.ctaText}
          onChange={(e) => handleChange("ctaText", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>წლები</Label>
          <Input
            value={content.home.stats.years}
            onChange={(e) => handleStatChange("years", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>საქმეები</Label>
          <Input
            value={content.home.stats.cases}
            onChange={(e) => handleStatChange("cases", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>პროფესიონალები</Label>
          <Input
            value={content.home.stats.professionals}
            onChange={(e) => handleStatChange("professionals", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>კლიენტები</Label>
          <Input
            value={content.home.stats.clients}
            onChange={(e) => handleStatChange("clients", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function PracticeAreasSection({ content, updateContent }: { 
  content: SiteContent; 
  updateContent: (c: SiteContent) => void;
}) {
  const addArea = () => {
    const newArea = {
      id: Date.now().toString(),
      title: "ახალი მიმართულება",
      description: "აღწერა",
      icon: "Briefcase",
    };
    updateContent({
      ...content,
      practiceAreas: [...content.practiceAreas, newArea],
    });
  };

  const updateArea = (id: string, field: string, value: string) => {
    updateContent({
      ...content,
      practiceAreas: content.practiceAreas.map((area) =>
        area.id === id ? { ...area, [field]: value } : area
      ),
    });
  };

  const deleteArea = (id: string) => {
    updateContent({
      ...content,
      practiceAreas: content.practiceAreas.filter((area) => area.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {content.practiceAreas.map((area) => (
        <Card key={area.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>სათაური</Label>
                <Input
                  value={area.title}
                  onChange={(e) => updateArea(area.id, "title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>აღწერა</Label>
                <Input
                  value={area.description}
                  onChange={(e) => updateArea(area.id, "description", e.target.value)}
                />
              </div>
              <div className="space-y-2 flex items-end gap-2">
                <div className="flex-1">
                  <Label>Icon (Building2, Home, Briefcase, Shield, Gavel, Globe)</Label>
                  <Input
                    value={area.icon}
                    onChange={(e) => updateArea(area.id, "icon", e.target.value)}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteArea(area.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addArea} className="w-full bg-gold text-black hover:bg-gold-light">
        <Plus className="w-4 h-4 mr-2" />
        მიმართულების დამატება
      </Button>
    </div>
  );
}

function TeamSection({ content, updateContent }: { 
  content: SiteContent; 
  updateContent: (c: SiteContent) => void;
}) {
  const addMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: "ახალი წევრი",
      role: "თანამდებობა",
      bio: "ბიოგრაფია",
      image: "",
    };
    updateContent({
      ...content,
      team: [...content.team, newMember],
    });
  };

  const updateMember = (id: string, field: string, value: string) => {
    updateContent({
      ...content,
      team: content.team.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      ),
    });
  };

  const deleteMember = (id: string) => {
    updateContent({
      ...content,
      team: content.team.filter((member) => member.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {content.team.map((member) => (
        <Card key={member.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>სახელი</Label>
                <Input
                  value={member.name}
                  onChange={(e) => updateMember(member.id, "name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>თანამდებობა</Label>
                <Input
                  value={member.role}
                  onChange={(e) => updateMember(member.id, "role", e.target.value)}
                />
              </div>
              <div className="space-y-2 flex items-end gap-2">
                <div className="flex-1">
                  <Label>ბიოგრაფია</Label>
                  <Input
                    value={member.bio}
                    onChange={(e) => updateMember(member.id, "bio", e.target.value)}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteMember(member.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addMember} className="w-full bg-gold text-black hover:bg-gold-light">
        <Plus className="w-4 h-4 mr-2" />
        წევრის დამატება
      </Button>
    </div>
  );
}

function CasesSection({ content, updateContent }: { 
  content: SiteContent; 
  updateContent: (c: SiteContent) => void;
}) {
  const addCase = () => {
    const newCase = {
      id: Date.now().toString(),
      title: "ახალი საქმე",
      category: "კატეგორია",
      description: "აღწერა",
      result: "შედეგი",
    };
    updateContent({
      ...content,
      cases: [...content.cases, newCase],
    });
  };

  const updateCase = (id: string, field: string, value: string) => {
    updateContent({
      ...content,
      cases: content.cases.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    });
  };

  const deleteCase = (id: string) => {
    updateContent({
      ...content,
      cases: content.cases.filter((c) => c.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {content.cases.map((c) => (
        <Card key={c.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>სათაური</Label>
                <Input
                  value={c.title}
                  onChange={(e) => updateCase(c.id, "title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>კატეგორია</Label>
                <Input
                  value={c.category}
                  onChange={(e) => updateCase(c.id, "category", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>შედეგი</Label>
                <Input
                  value={c.result}
                  onChange={(e) => updateCase(c.id, "result", e.target.value)}
                />
              </div>
              <div className="space-y-2 flex items-end gap-2">
                <div className="flex-1">
                  <Label>აღწერა</Label>
                  <Input
                    value={c.description}
                    onChange={(e) => updateCase(c.id, "description", e.target.value)}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteCase(c.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addCase} className="w-full bg-gold text-black hover:bg-gold-light">
        <Plus className="w-4 h-4 mr-2" />
        საქმის დამატება
      </Button>
    </div>
  );
}

function FaqsSection({ content, updateContent }: { 
  content: SiteContent; 
  updateContent: (c: SiteContent) => void;
}) {
  const addFaq = () => {
    const newFaq = {
      id: Date.now().toString(),
      question: "ახალი კითხვა",
      answer: "პასუხი",
    };
    updateContent({
      ...content,
      faqs: [...content.faqs, newFaq],
    });
  };

  const updateFaq = (id: string, field: string, value: string) => {
    updateContent({
      ...content,
      faqs: content.faqs.map((faq) =>
        faq.id === id ? { ...faq, [field]: value } : faq
      ),
    });
  };

  const deleteFaq = (id: string) => {
    updateContent({
      ...content,
      faqs: content.faqs.filter((faq) => faq.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {content.faqs.map((faq) => (
        <Card key={faq.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>კითხვა</Label>
                <Input
                  value={faq.question}
                  onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                />
              </div>
              <div className="space-y-2 flex items-start gap-2">
                <div className="flex-1">
                  <Label>პასუხი</Label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                    rows={2}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="mt-6"
                  onClick={() => deleteFaq(faq.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addFaq} className="w-full bg-gold text-black hover:bg-gold-light">
        <Plus className="w-4 h-4 mr-2" />
        კითხვის დამატება
      </Button>
    </div>
  );
}

function TestimonialsSection({ content, updateContent }: { 
  content: SiteContent; 
  updateContent: (c: SiteContent) => void;
}) {
  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      name: "ახალი კლიენტი",
      role: "როლი",
      content: "შეფასება",
      initial: "A",
    };
    updateContent({
      ...content,
      testimonials: [...content.testimonials, newTestimonial],
    });
  };

  const updateTestimonial = (id: string, field: string, value: string) => {
    updateContent({
      ...content,
      testimonials: content.testimonials.map((t) =>
        t.id === id ? { ...t, [field]: value } : t
      ),
    });
  };

  const deleteTestimonial = (id: string) => {
    updateContent({
      ...content,
      testimonials: content.testimonials.filter((t) => t.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {content.testimonials.map((t) => (
        <Card key={t.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>სახელი</Label>
                <Input
                  value={t.name}
                  onChange={(e) => updateTestimonial(t.id, "name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>როლი</Label>
                <Input
                  value={t.role}
                  onChange={(e) => updateTestimonial(t.id, "role", e.target.value)}
                />
              </div>
              <div className="space-y-2 flex items-end gap-2">
                <div className="flex-1">
                  <Label>ინიციალი</Label>
                  <Input
                    value={t.initial}
                    onChange={(e) => updateTestimonial(t.id, "initial", e.target.value)}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteTestimonial(t.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label>შეფასება</Label>
              <Textarea
                value={t.content}
                onChange={(e) => updateTestimonial(t.id, "content", e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addTestimonial} className="w-full bg-gold text-black hover:bg-gold-light">
        <Plus className="w-4 h-4 mr-2" />
        შეფასების დამატება
      </Button>
    </div>
  );
}

function AboutSection({ content, updateContent }: { 
  content: SiteContent; 
  updateContent: (c: SiteContent) => void;
}) {
  const handleChange = (field: keyof typeof content.about, value: string | string[]) => {
    updateContent({
      ...content,
      about: { ...content.about, [field]: value },
    });
  };

  const addValue = () => {
    updateContent({
      ...content,
      about: { ...content.about, values: [...content.about.values, "ახალი ღირებულება"] },
    });
  };

  const updateValue = (index: number, value: string) => {
    const newValues = [...content.about.values];
    newValues[index] = value;
    handleChange("values", newValues);
  };

  const deleteValue = (index: number) => {
    handleChange("values", content.about.values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>სათაური</Label>
        <Input
          value={content.about.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>აღწერა</Label>
        <Textarea
          value={content.about.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label>მისია</Label>
        <Textarea
          value={content.about.mission}
          onChange={(e) => handleChange("mission", e.target.value)}
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <Label>ხედვა</Label>
        <Textarea
          value={content.about.vision}
          onChange={(e) => handleChange("vision", e.target.value)}
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <Label>ღირებულებები</Label>
        {content.about.values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={value}
              onChange={(e) => updateValue(index, e.target.value)}
            />
            <Button variant="destructive" size="icon" onClick={() => deleteValue(index)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button onClick={addValue} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          ღირებულების დამატება
        </Button>
      </div>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoaded: authLoaded, login, logout } = useAdminAuth();
  const { content, setContent } = useContent();
  const [activeTab, setActiveTab] = useState("company");

  useEffect(() => {
    if (authLoaded && !isAuthenticated) {
      // Stay on page to show login form
    }
  }, [authLoaded, isAuthenticated]);

  const handleSave = () => {
    toast.success("ცვლილებები შენახულია");
  };

  const handleReset = async () => {
    if (confirm("დარწმუნებული ხართ? ყველა ცვლილება წაიშლება.")) {
      await resetContent();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("თქვენ გამოხვედით სისტემიდან");
    navigate("/");
  };

  if (!authLoaded) {
    return <div className="min-h-screen flex items-center justify-center">იტვირთება...</div>;
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
              <span className="font-serif font-bold text-black text-lg">L</span>
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-gold">lawgicaal</h1>
              <p className="text-xs text-muted-foreground">ადმინ პანელი</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="text-destructive hover:text-destructive"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              რესეტი
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              გასვლა
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
            <TabsTrigger value="company">კომპანია</TabsTrigger>
            <TabsTrigger value="home">მთავარი</TabsTrigger>
            <TabsTrigger value="about">ჩვენს შესახებ</TabsTrigger>
            <TabsTrigger value="areas">მიმართულებები</TabsTrigger>
            <TabsTrigger value="team">გუნდი</TabsTrigger>
            <TabsTrigger value="cases">ქეისები</TabsTrigger>
            <TabsTrigger value="faqs">FAQ</TabsTrigger>
            <TabsTrigger value="testimonials">შეფასებები</TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle className="text-gold">კომპანიის ინფორმაცია</CardTitle>
                <CardDescription>კონტაქტი და საკონტაქტო ინფორმაცია</CardDescription>
              </CardHeader>
              <CardContent>
                <CompanySection content={content} updateContent={setContent} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="home">
            <Card>
              <CardHeader>
                <CardTitle className="text-gold">მთავარი გვერდი</CardTitle>
                <CardDescription>Hero სექცია და სტატისტიკა</CardDescription>
              </CardHeader>
              <CardContent>
                <HomeSection content={content} updateContent={setContent} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle className="text-gold">ჩვენს შესახებ</CardTitle>
                <CardDescription>მისია, ხედვა და ღირებულებები</CardDescription>
              </CardHeader>
              <CardContent>
                <AboutSection content={content} updateContent={setContent} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="areas">
            <Card>
              <CardHeader>
                <CardTitle className="text-gold">სამუშაო მიმართულებები</CardTitle>
                <CardDescription>ყველა სერვისის მართვა</CardDescription>
              </CardHeader>
              <CardContent>
                <PracticeAreasSection content={content} updateContent={setContent} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="text-gold">გუნდის წევრები</CardTitle>
                <CardDescription>ადვოკატებისა და იურისტების სია</CardDescription>
              </CardHeader>
              <CardContent>
                <TeamSection content={content} updateContent={setContent} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases">
            <Card>
              <CardHeader>
                <CardTitle className="text-gold">ქეისები</CardTitle>
                <CardDescription>განხილული საქმეები</CardDescription>
              </CardHeader>
              <CardContent>
                <CasesSection content={content} updateContent={setContent} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faqs">
            <Card>
              <CardHeader>
                <CardTitle className="text-gold">ხშირი კითხვები</CardTitle>
                <CardDescription>FAQ მართვა</CardDescription>
              </CardHeader>
              <CardContent>
                <FaqsSection content={content} updateContent={setContent} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle className="text-gold">კლიენტების შეფასებები</CardTitle>
                <CardDescription>რეკომენდაციები</CardDescription>
              </CardHeader>
              <CardContent>
                <TestimonialsSection content={content} updateContent={setContent} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleSave}
            className="bg-gold text-black hover:bg-gold-light px-8"
          >
            <Save className="w-4 h-4 mr-2" />
            ცვლილებების შენახვა
          </Button>
        </div>
      </main>
    </div>
  );
}
