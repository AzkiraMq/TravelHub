import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const experienceFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  type: z.string({
    required_error: "Please select an experience type.",
  }),
  location: z.object({
    address: z.string().min(5, {
      message: "Address must be at least 5 characters.",
    }),
    city: z.string().min(2, {
      message: "City must be at least 2 characters.",
    }),
    state: z.string().optional(),
    country: z.string().min(2, {
      message: "Country must be at least 2 characters.",
    }),
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  currency: z.string().min(1, {
    message: "Please select a currency.",
  }),
  duration: z.object({
    length: z.coerce.number().positive({
      message: "Duration must be a positive number.",
    }),
    unit: z.enum(["minutes", "hours", "days"], {
      required_error: "Please select a duration unit.",
    }),
  }),
  groupSize: z
    .object({
      min: z.coerce.number().nonnegative({
        message: "Minimum group size must be a non-negative number.",
      }),
      max: z.coerce.number().positive({
        message: "Maximum group size must be a positive number.",
      }),
    })
    .refine((data) => data.max >= data.min, {
      message:
        "Maximum group size must be greater than or equal to minimum group size.",
      path: ["max"],
    }),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, {
    message: "Please add at least one image.",
  }),
  languages: z.array(z.string()).min(1, {
    message: "Please select at least one language.",
  }),
  availability: z
    .object({
      schedule: z
        .array(
          z.object({
            dayOfWeek: z.number().min(0).max(6),
            startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
              message: "Please enter a valid time in 24-hour format (HH:MM).",
            }),
            endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
              message: "Please enter a valid time in 24-hour format (HH:MM).",
            }),
          }),
        )
        .optional(),
      customDates: z
        .array(
          z.object({
            date: z.string(),
            startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
              message: "Please enter a valid time in 24-hour format (HH:MM).",
            }),
            endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
              message: "Please enter a valid time in 24-hour format (HH:MM).",
            }),
          }),
        )
        .optional(),
    })
    .optional(),
});

type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

const ExperienceListingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [includedItems, setIncludedItems] = useState<string[]>([]);
  const [excludedItems, setExcludedItems] = useState<string[]>([]);
  const [requirementItems, setRequirementItems] = useState<string[]>([]);
  const [newIncludedItem, setNewIncludedItem] = useState("");
  const [newExcludedItem, setNewExcludedItem] = useState("");
  const [newRequirementItem, setNewRequirementItem] = useState("");
  const [scheduleItems, setScheduleItems] = useState<
    Array<{
      dayOfWeek: number;
      startTime: string;
      endTime: string;
    }>
  >([]);
  const [customDateItems, setCustomDateItems] = useState<
    Array<{
      date: Date;
      startTime: string;
      endTime: string;
    }>
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      location: {
        address: "",
        city: "",
        state: "",
        country: "",
      },
      price: 0,
      currency: "USD",
      duration: {
        length: 1,
        unit: "hours",
      },
      groupSize: {
        min: 1,
        max: 10,
      },
      included: [],
      excluded: [],
      requirements: [],
      images: [
        "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&q=80",
      ],
      languages: ["English"],
      availability: {
        schedule: [],
        customDates: [],
      },
    },
  });

  const onSubmit = async (data: ExperienceFormValues) => {
    setIsSubmitting(true);
    try {
      // Add the list items to the form data
      data.included = includedItems;
      data.excluded = excludedItems;
      data.requirements = requirementItems;

      // Format schedule items
      if (scheduleItems.length > 0) {
        data.availability = {
          ...data.availability,
          schedule: scheduleItems,
        };
      }

      // Format custom date items
      if (customDateItems.length > 0) {
        data.availability = {
          ...data.availability,
          customDates: customDateItems.map((item) => ({
            date: item.date.toISOString().split("T")[0],
            startTime: item.startTime,
            endTime: item.endTime,
          })),
        };
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addIncludedItem = () => {
    if (newIncludedItem.trim() !== "") {
      setIncludedItems([...includedItems, newIncludedItem.trim()]);
      setNewIncludedItem("");
    }
  };

  const addExcludedItem = () => {
    if (newExcludedItem.trim() !== "") {
      setExcludedItems([...excludedItems, newExcludedItem.trim()]);
      setNewExcludedItem("");
    }
  };

  const addRequirementItem = () => {
    if (newRequirementItem.trim() !== "") {
      setRequirementItems([...requirementItems, newRequirementItem.trim()]);
      setNewRequirementItem("");
    }
  };

  const removeIncludedItem = (index: number) => {
    setIncludedItems(includedItems.filter((_, i) => i !== index));
  };

  const removeExcludedItem = (index: number) => {
    setExcludedItems(excludedItems.filter((_, i) => i !== index));
  };

  const removeRequirementItem = (index: number) => {
    setRequirementItems(requirementItems.filter((_, i) => i !== index));
  };

  const addScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      { dayOfWeek: 1, startTime: "09:00", endTime: "12:00" },
    ]);
  };

  const updateScheduleItem = (index: number, field: string, value: any) => {
    const updatedItems = [...scheduleItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setScheduleItems(updatedItems);
  };

  const removeScheduleItem = (index: number) => {
    setScheduleItems(scheduleItems.filter((_, i) => i !== index));
  };

  const addCustomDateItem = () => {
    if (selectedDate && newStartTime && newEndTime) {
      setCustomDateItems([
        ...customDateItems,
        { date: selectedDate, startTime: newStartTime, endTime: newEndTime },
      ]);
      setSelectedDate(undefined);
      setNewStartTime("");
      setNewEndTime("");
    }
  };

  const removeCustomDateItem = (index: number) => {
    setCustomDateItems(customDateItems.filter((_, i) => i !== index));
  };

  const experienceTypes = [
    { id: "tour", label: "Guided Tour" },
    { id: "activity", label: "Activity" },
    { id: "workshop", label: "Workshop" },
    { id: "adventure", label: "Adventure" },
    { id: "cultural", label: "Cultural Experience" },
    { id: "food", label: "Food & Drink" },
  ];

  const languages = [
    { id: "english", label: "English" },
    { id: "spanish", label: "Spanish" },
    { id: "french", label: "French" },
    { id: "german", label: "German" },
    { id: "italian", label: "Italian" },
    { id: "japanese", label: "Japanese" },
    { id: "chinese", label: "Chinese" },
    { id: "arabic", label: "Arabic" },
  ];

  const currencies = [
    { id: "USD", label: "USD ($)" },
    { id: "EUR", label: "EUR (€)" },
    { id: "GBP", label: "GBP (£)" },
    { id: "JPY", label: "JPY (¥)" },
    { id: "CAD", label: "CAD ($)" },
    { id: "AUD", label: "AUD ($)" },
  ];

  const daysOfWeek = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ];

  if (submitSuccess) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-green-600">
            Experience Listed Successfully!
          </CardTitle>
          <CardDescription className="text-center">
            Your experience has been submitted for review. Once approved, it
            will be visible to travelers on our platform.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={() => setSubmitSuccess(false)}>
            List Another Experience
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          List Your Experience
        </CardTitle>
        <CardDescription>
          Share your unique experience with travelers from around the world.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Historic City Walking Tour"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your experience in detail..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {experienceTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Languages</FormLabel>
                        <div className="space-y-2">
                          {languages.map((language) => (
                            <div
                              key={language.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`language-${language.id}`}
                                checked={field.value?.includes(language.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        language.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== language.id,
                                        ),
                                      );
                                }}
                              />
                              <label
                                htmlFor={`language-${language.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {language.label}
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Person</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency.id} value={currency.id}>
                                {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="duration.length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration.unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="minutes">Minutes</SelectItem>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="groupSize.min"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Group Size</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="groupSize.max"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Group Size</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormLabel>Location</FormLabel>
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="location.address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Meeting point or address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="location.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input placeholder="State/Province" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Inclusions Tab */}
              <TabsContent value="inclusions" className="space-y-6">
                <div className="space-y-4">
                  <FormLabel>What's Included</FormLabel>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="e.g., Guided tour, Entrance fees"
                      value={newIncludedItem}
                      onChange={(e) => setNewIncludedItem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addIncludedItem();
                        }
                      }}
                    />
                    <Button type="button" onClick={addIncludedItem} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {includedItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-slate-50 p-2 rounded"
                      >
                        <span>{item}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeIncludedItem(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <FormLabel>What's Not Included</FormLabel>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="e.g., Meals, Transportation"
                      value={newExcludedItem}
                      onChange={(e) => setNewExcludedItem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addExcludedItem();
                        }
                      }}
                    />
                    <Button type="button" onClick={addExcludedItem} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {excludedItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-slate-50 p-2 rounded"
                      >
                        <span>{item}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExcludedItem(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <FormLabel>Requirements</FormLabel>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="e.g., Comfortable walking shoes, Sunscreen"
                      value={newRequirementItem}
                      onChange={(e) => setNewRequirementItem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addRequirementItem();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addRequirementItem}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {requirementItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-slate-50 p-2 rounded"
                      >
                        <span>{item}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRequirementItem(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Availability Tab */}
              <TabsContent value="availability" className="space-y-6">
                <div className="space-y-4">
                  <FormLabel>Regular Schedule</FormLabel>
                  <div className="space-y-4">
                    {scheduleItems.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end bg-slate-50 p-3 rounded"
                      >
                        <div>
                          <FormLabel className="text-xs">Day</FormLabel>
                          <Select
                            value={item.dayOfWeek.toString()}
                            onValueChange={(value) =>
                              updateScheduleItem(
                                index,
                                "dayOfWeek",
                                parseInt(value),
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {daysOfWeek.map((day) => (
                                <SelectItem
                                  key={day.value}
                                  value={day.value.toString()}
                                >
                                  {day.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <FormLabel className="text-xs">Start Time</FormLabel>
                          <Input
                            type="time"
                            value={item.startTime}
                            onChange={(e) =>
                              updateScheduleItem(
                                index,
                                "startTime",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <FormLabel className="text-xs">End Time</FormLabel>
                          <Input
                            type="time"
                            value={item.endTime}
                            onChange={(e) =>
                              updateScheduleItem(
                                index,
                                "endTime",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeScheduleItem(index)}
                          className="mt-auto"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addScheduleItem}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Schedule
                  </Button>
                </div>

                <div className="space-y-4">
                  <FormLabel>Custom Dates</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
                    <div>
                      <FormLabel className="text-xs">Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              format(selectedDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <FormLabel className="text-xs">Start Time</FormLabel>
                      <Input
                        type="time"
                        value={newStartTime}
                        onChange={(e) => setNewStartTime(e.target.value)}
                      />
                    </div>
                    <div>
                      <FormLabel className="text-xs">End Time</FormLabel>
                      <Input
                        type="time"
                        value={newEndTime}
                        onChange={(e) => setNewEndTime(e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addCustomDateItem}
                      disabled={!selectedDate || !newStartTime || !newEndTime}
                      className="mt-auto"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>

                  <div className="space-y-2 mt-4">
                    {customDateItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-slate-50 p-2 rounded"
                      >
                        <span>
                          {format(item.date, "PPP")} ({item.startTime} -{" "}
                          {item.endTime})
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCustomDateItem(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "List Experience"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ExperienceListingForm;
