import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_course_holes_hazards_hazard_type" AS ENUM('bunker', 'water', 'out-of-bounds', 'trees', 'rough', 'slope', 'other');
  CREATE TYPE "public"."enum_course_holes_verification_status" AS ENUM('pending', 'verified');
  CREATE TYPE "public"."enum_tournaments_status" AS ENUM('draft', 'announced', 'registration-open', 'registration-closed', 'draw-published', 'in-progress', 'results-published', 'postponed', 'cancelled', 'archived');
  CREATE TYPE "public"."enum_tournaments_verification_status" AS ENUM('pending', 'verified');
  CREATE TYPE "public"."enum_rooms_tariff_guest_category" AS ENUM('member', 'affiliated', 'member-guest', 'visitor');
  CREATE TYPE "public"."enum_rooms_bed_type" AS ENUM('double', 'twin', 'family', 'suite');
  CREATE TYPE "public"."enum_rooms_view" AS ENUM('course', 'garden', 'other');
  CREATE TYPE "public"."enum_rooms_verification_status" AS ENUM('pending', 'verified');
  CREATE TYPE "public"."enum_tariffs_visitor_category" AS ENUM('member', 'affiliated', 'member-guest', 'visitor', 'tournament');
  CREATE TYPE "public"."enum_tariffs_category" AS ENUM('green-fee', 'caddy', 'buggy', 'rental', 'coaching', 'room', 'membership', 'tournament-entry', 'other');
  CREATE TYPE "public"."enum_tariffs_verification_status" AS ENUM('pending', 'verified');
  CREATE TYPE "public"."enum_contacts_department" AS ENUM('club-reception', 'golf-operations', 'tee-time-enquiries', 'general-manager', 'membership', 'tournament-office', 'downs-retreat', 'room-reservations', 'dining-reservations', 'accounts', 'coaching', 'emergency');
  CREATE TYPE "public"."enum_contacts_public_status" AS ENUM('public', 'internal');
  CREATE TYPE "public"."enum_affiliated_clubs_verification_status" AS ENUM('pending', 'verified');
  CREATE TYPE "public"."enum_committee_members_member_status" AS ENUM('active', 'former');
  CREATE TYPE "public"."enum_stories_category" AS ENUM('tournament-report', 'member-story', 'course-story', 'junior-golf', 'caddy-story', 'heritage', 'announcement', 'newsletter');
  CREATE TYPE "public"."enum_stories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__stories_v_version_category" AS ENUM('tournament-report', 'member-story', 'course-story', 'junior-golf', 'caddy-story', 'heritage', 'announcement', 'newsletter');
  CREATE TYPE "public"."enum__stories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_tee_time_requests_player_category" AS ENUM('member', 'affiliated', 'member-guest', 'visitor', 'tournament');
  CREATE TYPE "public"."enum_tee_time_requests_holes" AS ENUM('9', '18');
  CREATE TYPE "public"."enum_tee_time_requests_enquiry_status" AS ENUM('new', 'in-progress', 'confirmed', 'declined', 'closed');
  CREATE TYPE "public"."enum_room_enquiries_guest_category" AS ENUM('member', 'affiliated', 'member-guest', 'visitor', 'tournament');
  CREATE TYPE "public"."enum_room_enquiries_enquiry_status" AS ENUM('new', 'in-progress', 'confirmed', 'declined', 'closed');
  CREATE TYPE "public"."enum_dining_enquiries_guest_category" AS ENUM('member', 'affiliated', 'member-guest', 'visitor', 'tournament');
  CREATE TYPE "public"."enum_dining_enquiries_enquiry_status" AS ENUM('new', 'in-progress', 'confirmed', 'declined', 'closed');
  CREATE TYPE "public"."enum_membership_enquiries_enquiry_status" AS ENUM('new', 'in-progress', 'confirmed', 'declined', 'closed');
  CREATE TYPE "public"."enum_media_usage_permission" AS ENUM('confirmed', 'unconfirmed');
  CREATE TYPE "public"."enum_course_status_course_status" AS ENUM('open', 'restricted', 'closed');
  CREATE TYPE "public"."enum_course_status_caddy_availability" AS ENUM('available', 'limited', 'unavailable');
  CREATE TYPE "public"."enum_course_status_buggy_availability" AS ENUM('available', 'limited', 'unavailable');
  CREATE TYPE "public"."enum_course_status_practice_area_status" AS ENUM('open', 'closed');
  CREATE TYPE "public"."enum_course_status_dining_status" AS ENUM('open', 'closed');
  CREATE TYPE "public"."enum_course_info_verification_status" AS ENUM('pending', 'verified');
  CREATE TABLE "course_holes_additional_tees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tee_name" varchar NOT NULL,
  	"distance" numeric NOT NULL
  );
  
  CREATE TABLE "course_holes_hazards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hazard_type" "enum_course_holes_hazards_hazard_type" NOT NULL,
  	"position" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "course_holes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hole_number" numeric NOT NULL,
  	"official_name" varchar NOT NULL,
  	"par" numeric NOT NULL,
  	"stroke_index" numeric,
  	"mens_distance" numeric,
  	"womens_distance" numeric,
  	"elevation_change" numeric,
  	"overview" varchar NOT NULL,
  	"tee_shot_strategy" varchar NOT NULL,
  	"approach_strategy" varchar,
  	"green_strategy" varchar,
  	"captain_tip" varchar,
  	"local_rule" varchar,
  	"primary_image_id" integer,
  	"hole_diagram_id" integer,
  	"aerial_image_id" integer,
  	"accessibility_description" varchar,
  	"verification_status" "enum_course_holes_verification_status" DEFAULT 'pending' NOT NULL,
  	"verification_verified_by" varchar,
  	"verification_verified_on" timestamp(3) with time zone,
  	"verification_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "course_holes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "tournaments_winners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar NOT NULL,
  	"player_name" varchar NOT NULL,
  	"score" varchar
  );
  
  CREATE TABLE "tournaments_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "tournaments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"year" numeric NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"status" "enum_tournaments_status" DEFAULT 'draft' NOT NULL,
  	"sponsor" varchar,
  	"format" varchar,
  	"eligibility" varchar,
  	"entry_fee" numeric,
  	"handicap_rule" varchar,
  	"maximum_field" numeric,
  	"registration_deadline" timestamp(3) with time zone,
  	"draw_document_id" integer,
  	"tee_times_document_id" integer,
  	"report" jsonb,
  	"results_document_id" integer,
  	"verification_status" "enum_tournaments_verification_status" DEFAULT 'pending' NOT NULL,
  	"verification_verified_by" varchar,
  	"verification_verified_on" timestamp(3) with time zone,
  	"verification_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tournaments_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "rooms_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"amenity" varchar NOT NULL
  );
  
  CREATE TABLE "rooms_tariff_guest_category" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_rooms_tariff_guest_category",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "rooms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"room_name" varchar NOT NULL,
  	"capacity" numeric NOT NULL,
  	"bed_type" "enum_rooms_bed_type",
  	"view" "enum_rooms_view",
  	"description" varchar,
  	"accessibility_information" varchar,
  	"check_in" varchar,
  	"check_out" varchar,
  	"tariff_current_tariff" numeric,
  	"tariff_tax_note" varchar,
  	"tariff_effective_date" timestamp(3) with time zone,
  	"tariff_review_date" timestamp(3) with time zone,
  	"policies" jsonb,
  	"display_order" numeric DEFAULT 0,
  	"verification_status" "enum_rooms_verification_status" DEFAULT 'pending' NOT NULL,
  	"verification_verified_by" varchar,
  	"verification_verified_on" timestamp(3) with time zone,
  	"verification_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "rooms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "tariffs_visitor_category" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_tariffs_visitor_category",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tariffs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"category" "enum_tariffs_category" NOT NULL,
  	"amount" numeric NOT NULL,
  	"unit" varchar,
  	"tax_note" varchar NOT NULL,
  	"effective_date" timestamp(3) with time zone NOT NULL,
  	"review_date" timestamp(3) with time zone NOT NULL,
  	"content_owner" varchar NOT NULL,
  	"notes" varchar,
  	"verification_status" "enum_tariffs_verification_status" DEFAULT 'pending' NOT NULL,
  	"verification_verified_by" varchar,
  	"verification_verified_on" timestamp(3) with time zone,
  	"verification_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contacts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"department" "enum_contacts_department" NOT NULL,
  	"contact_person" varchar,
  	"designation" varchar,
  	"phone" varchar,
  	"whatsapp_available" boolean DEFAULT false,
  	"email" varchar,
  	"working_hours" varchar,
  	"public_status" "enum_contacts_public_status" DEFAULT 'internal' NOT NULL,
  	"last_verified" timestamp(3) with time zone,
  	"display_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "affiliated_clubs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"club_name" varchar NOT NULL,
  	"city" varchar,
  	"state" varchar,
  	"country" varchar DEFAULT 'India',
  	"website" varchar,
  	"reciprocal_green_fee_id" integer,
  	"notes" varchar,
  	"verification_status" "enum_affiliated_clubs_verification_status" DEFAULT 'pending' NOT NULL,
  	"verification_verified_by" varchar,
  	"verification_verified_on" timestamp(3) with time zone,
  	"verification_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "committee_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"designation" varchar NOT NULL,
  	"photograph_id" integer,
  	"term_start" timestamp(3) with time zone,
  	"term_end" timestamp(3) with time zone,
  	"member_status" "enum_committee_members_member_status" DEFAULT 'active' NOT NULL,
  	"biography" varchar,
  	"public_contact" boolean DEFAULT false,
  	"contact_id" integer,
  	"display_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "newsletters_featured_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"story" varchar NOT NULL
  );
  
  CREATE TABLE "newsletters" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"year" numeric NOT NULL,
  	"edition" varchar,
  	"publication_date" timestamp(3) with time zone,
  	"cover_image_id" integer,
  	"summary" varchar NOT NULL,
  	"pdf_id" integer,
  	"html_summary" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_stories_category",
  	"published_date" timestamp(3) with time zone,
  	"excerpt" varchar,
  	"hero_image_id" integer,
  	"body" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_stories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_stories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__stories_v_version_category",
  	"version_published_date" timestamp(3) with time zone,
  	"version_excerpt" varchar,
  	"version_hero_image_id" integer,
  	"version_body" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__stories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "tee_time_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"player_category" "enum_tee_time_requests_player_category" NOT NULL,
  	"preferred_date" timestamp(3) with time zone NOT NULL,
  	"alternative_date" timestamp(3) with time zone,
  	"number_of_golfers" numeric NOT NULL,
  	"holes" "enum_tee_time_requests_holes" NOT NULL,
  	"preferred_time_range" varchar,
  	"caddy_required" boolean DEFAULT false,
  	"buggy_required" boolean DEFAULT false,
  	"rental_clubs_required" boolean DEFAULT false,
  	"full_name" varchar NOT NULL,
  	"mobile" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"home_club" varchar,
  	"handicap" varchar,
  	"affiliation_details" varchar,
  	"member_host" varchar,
  	"notes" varchar,
  	"enquiry_status" "enum_tee_time_requests_enquiry_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "room_enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"check_in_date" timestamp(3) with time zone NOT NULL,
  	"check_out_date" timestamp(3) with time zone NOT NULL,
  	"number_of_rooms" numeric NOT NULL,
  	"adults" numeric NOT NULL,
  	"children" numeric DEFAULT 0,
  	"guest_category" "enum_room_enquiries_guest_category" NOT NULL,
  	"golf_required" boolean DEFAULT false,
  	"dining_required" boolean DEFAULT false,
  	"full_name" varchar NOT NULL,
  	"mobile" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"notes" varchar,
  	"enquiry_status" "enum_room_enquiries_enquiry_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dining_enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"dining_date" timestamp(3) with time zone NOT NULL,
  	"preferred_time" varchar NOT NULL,
  	"party_size" numeric NOT NULL,
  	"guest_category" "enum_dining_enquiries_guest_category" NOT NULL,
  	"full_name" varchar NOT NULL,
  	"mobile" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"dietary_notes" varchar,
  	"notes" varchar,
  	"enquiry_status" "enum_dining_enquiries_enquiry_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "membership_enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"mobile" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"city" varchar,
  	"home_club" varchar,
  	"handicap" varchar,
  	"message" varchar,
  	"enquiry_status" "enum_membership_enquiries_enquiry_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"copyright_owner" varchar,
  	"usage_permission" "enum_media_usage_permission" DEFAULT 'unconfirmed',
  	"is_archival" boolean DEFAULT false,
  	"approximate_date" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"course_holes_id" integer,
  	"tournaments_id" integer,
  	"rooms_id" integer,
  	"tariffs_id" integer,
  	"contacts_id" integer,
  	"affiliated_clubs_id" integer,
  	"committee_members_id" integer,
  	"newsletters_id" integer,
  	"stories_id" integer,
  	"tee_time_requests_id" integer,
  	"room_enquiries_id" integer,
  	"dining_enquiries_id" integer,
  	"membership_enquiries_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "course_status" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"course_status" "enum_course_status_course_status" DEFAULT 'open' NOT NULL,
  	"first_tee_status" varchar,
  	"weather_note" varchar,
  	"caddy_availability" "enum_course_status_caddy_availability" DEFAULT 'available',
  	"buggy_availability" "enum_course_status_buggy_availability" DEFAULT 'available',
  	"practice_area_status" "enum_course_status_practice_area_status" DEFAULT 'open',
  	"dining_status" "enum_course_status_dining_status" DEFAULT 'open',
  	"notice_to_golfers" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "course_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number_of_holes" numeric DEFAULT 18,
  	"course_par" numeric,
  	"mens_yardage" numeric,
  	"womens_yardage" numeric,
  	"course_rating" numeric,
  	"slope_rating" numeric,
  	"total_acreage" numeric,
  	"elevation_metres" numeric,
  	"latitude" numeric,
  	"longitude" numeric,
  	"green_grass" varchar,
  	"fairway_grass" varchar,
  	"rough_grass" varchar,
  	"number_of_bunkers" numeric,
  	"number_of_water_hazards" numeric,
  	"course_record" varchar,
  	"services_caddies_available" boolean DEFAULT false,
  	"services_buggies_available" boolean DEFAULT false,
  	"services_rental_clubs_available" boolean DEFAULT false,
  	"services_practice_facilities" boolean DEFAULT false,
  	"services_coaching_available" boolean DEFAULT false,
  	"landscape_character" varchar,
  	"verification_status" "enum_course_info_verification_status" DEFAULT 'pending' NOT NULL,
  	"verification_verified_by" varchar,
  	"verification_verified_on" timestamp(3) with time zone,
  	"verification_notes" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_directions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"origin" varchar NOT NULL,
  	"approximate_distance" varchar,
  	"approximate_time" varchar,
  	"verified" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"club_name" varchar DEFAULT 'Mercara Downs Golf Club',
  	"tagline" varchar DEFAULT 'Golf in the Mist',
  	"heritage_statement" varchar DEFAULT 'Golf has been played on the Mercara Downs since the late nineteenth century.',
  	"address_line1" varchar,
  	"address_line2" varchar,
  	"address_town" varchar DEFAULT 'Madikeri',
  	"address_district" varchar DEFAULT 'Kodagu (Coorg)',
  	"address_state" varchar DEFAULT 'Karnataka',
  	"address_pincode" varchar,
  	"maps_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "course_holes_additional_tees" ADD CONSTRAINT "course_holes_additional_tees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."course_holes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "course_holes_hazards" ADD CONSTRAINT "course_holes_hazards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."course_holes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "course_holes" ADD CONSTRAINT "course_holes_primary_image_id_media_id_fk" FOREIGN KEY ("primary_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "course_holes" ADD CONSTRAINT "course_holes_hole_diagram_id_media_id_fk" FOREIGN KEY ("hole_diagram_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "course_holes" ADD CONSTRAINT "course_holes_aerial_image_id_media_id_fk" FOREIGN KEY ("aerial_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "course_holes_rels" ADD CONSTRAINT "course_holes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."course_holes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "course_holes_rels" ADD CONSTRAINT "course_holes_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tournaments_winners" ADD CONSTRAINT "tournaments_winners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tournaments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tournaments_documents" ADD CONSTRAINT "tournaments_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tournaments_documents" ADD CONSTRAINT "tournaments_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tournaments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_draw_document_id_media_id_fk" FOREIGN KEY ("draw_document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_tee_times_document_id_media_id_fk" FOREIGN KEY ("tee_times_document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_results_document_id_media_id_fk" FOREIGN KEY ("results_document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tournaments_rels" ADD CONSTRAINT "tournaments_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tournaments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tournaments_rels" ADD CONSTRAINT "tournaments_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_amenities" ADD CONSTRAINT "rooms_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_tariff_guest_category" ADD CONSTRAINT "rooms_tariff_guest_category_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_rels" ADD CONSTRAINT "rooms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_rels" ADD CONSTRAINT "rooms_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tariffs_visitor_category" ADD CONSTRAINT "tariffs_visitor_category_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tariffs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "affiliated_clubs" ADD CONSTRAINT "affiliated_clubs_reciprocal_green_fee_id_tariffs_id_fk" FOREIGN KEY ("reciprocal_green_fee_id") REFERENCES "public"."tariffs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "committee_members" ADD CONSTRAINT "committee_members_photograph_id_media_id_fk" FOREIGN KEY ("photograph_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "committee_members" ADD CONSTRAINT "committee_members_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "newsletters_featured_stories" ADD CONSTRAINT "newsletters_featured_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."newsletters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "newsletters" ADD CONSTRAINT "newsletters_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "newsletters" ADD CONSTRAINT "newsletters_pdf_id_media_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v" ADD CONSTRAINT "_stories_v_parent_id_stories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_stories_v" ADD CONSTRAINT "_stories_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_course_holes_fk" FOREIGN KEY ("course_holes_id") REFERENCES "public"."course_holes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tournaments_fk" FOREIGN KEY ("tournaments_id") REFERENCES "public"."tournaments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tariffs_fk" FOREIGN KEY ("tariffs_id") REFERENCES "public"."tariffs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contacts_fk" FOREIGN KEY ("contacts_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_affiliated_clubs_fk" FOREIGN KEY ("affiliated_clubs_id") REFERENCES "public"."affiliated_clubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_committee_members_fk" FOREIGN KEY ("committee_members_id") REFERENCES "public"."committee_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletters_fk" FOREIGN KEY ("newsletters_id") REFERENCES "public"."newsletters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tee_time_requests_fk" FOREIGN KEY ("tee_time_requests_id") REFERENCES "public"."tee_time_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_room_enquiries_fk" FOREIGN KEY ("room_enquiries_id") REFERENCES "public"."room_enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dining_enquiries_fk" FOREIGN KEY ("dining_enquiries_id") REFERENCES "public"."dining_enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_membership_enquiries_fk" FOREIGN KEY ("membership_enquiries_id") REFERENCES "public"."membership_enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_directions" ADD CONSTRAINT "site_settings_directions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "course_holes_additional_tees_order_idx" ON "course_holes_additional_tees" USING btree ("_order");
  CREATE INDEX "course_holes_additional_tees_parent_id_idx" ON "course_holes_additional_tees" USING btree ("_parent_id");
  CREATE INDEX "course_holes_hazards_order_idx" ON "course_holes_hazards" USING btree ("_order");
  CREATE INDEX "course_holes_hazards_parent_id_idx" ON "course_holes_hazards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "course_holes_hole_number_idx" ON "course_holes" USING btree ("hole_number");
  CREATE INDEX "course_holes_primary_image_idx" ON "course_holes" USING btree ("primary_image_id");
  CREATE INDEX "course_holes_hole_diagram_idx" ON "course_holes" USING btree ("hole_diagram_id");
  CREATE INDEX "course_holes_aerial_image_idx" ON "course_holes" USING btree ("aerial_image_id");
  CREATE INDEX "course_holes_updated_at_idx" ON "course_holes" USING btree ("updated_at");
  CREATE INDEX "course_holes_created_at_idx" ON "course_holes" USING btree ("created_at");
  CREATE INDEX "course_holes_rels_order_idx" ON "course_holes_rels" USING btree ("order");
  CREATE INDEX "course_holes_rels_parent_idx" ON "course_holes_rels" USING btree ("parent_id");
  CREATE INDEX "course_holes_rels_path_idx" ON "course_holes_rels" USING btree ("path");
  CREATE INDEX "course_holes_rels_media_id_idx" ON "course_holes_rels" USING btree ("media_id");
  CREATE INDEX "tournaments_winners_order_idx" ON "tournaments_winners" USING btree ("_order");
  CREATE INDEX "tournaments_winners_parent_id_idx" ON "tournaments_winners" USING btree ("_parent_id");
  CREATE INDEX "tournaments_documents_order_idx" ON "tournaments_documents" USING btree ("_order");
  CREATE INDEX "tournaments_documents_parent_id_idx" ON "tournaments_documents" USING btree ("_parent_id");
  CREATE INDEX "tournaments_documents_file_idx" ON "tournaments_documents" USING btree ("file_id");
  CREATE INDEX "tournaments_draw_document_idx" ON "tournaments" USING btree ("draw_document_id");
  CREATE INDEX "tournaments_tee_times_document_idx" ON "tournaments" USING btree ("tee_times_document_id");
  CREATE INDEX "tournaments_results_document_idx" ON "tournaments" USING btree ("results_document_id");
  CREATE INDEX "tournaments_updated_at_idx" ON "tournaments" USING btree ("updated_at");
  CREATE INDEX "tournaments_created_at_idx" ON "tournaments" USING btree ("created_at");
  CREATE INDEX "tournaments_rels_order_idx" ON "tournaments_rels" USING btree ("order");
  CREATE INDEX "tournaments_rels_parent_idx" ON "tournaments_rels" USING btree ("parent_id");
  CREATE INDEX "tournaments_rels_path_idx" ON "tournaments_rels" USING btree ("path");
  CREATE INDEX "tournaments_rels_media_id_idx" ON "tournaments_rels" USING btree ("media_id");
  CREATE INDEX "rooms_amenities_order_idx" ON "rooms_amenities" USING btree ("_order");
  CREATE INDEX "rooms_amenities_parent_id_idx" ON "rooms_amenities" USING btree ("_parent_id");
  CREATE INDEX "rooms_tariff_guest_category_order_idx" ON "rooms_tariff_guest_category" USING btree ("order");
  CREATE INDEX "rooms_tariff_guest_category_parent_idx" ON "rooms_tariff_guest_category" USING btree ("parent_id");
  CREATE INDEX "rooms_updated_at_idx" ON "rooms" USING btree ("updated_at");
  CREATE INDEX "rooms_created_at_idx" ON "rooms" USING btree ("created_at");
  CREATE INDEX "rooms_rels_order_idx" ON "rooms_rels" USING btree ("order");
  CREATE INDEX "rooms_rels_parent_idx" ON "rooms_rels" USING btree ("parent_id");
  CREATE INDEX "rooms_rels_path_idx" ON "rooms_rels" USING btree ("path");
  CREATE INDEX "rooms_rels_media_id_idx" ON "rooms_rels" USING btree ("media_id");
  CREATE INDEX "tariffs_visitor_category_order_idx" ON "tariffs_visitor_category" USING btree ("order");
  CREATE INDEX "tariffs_visitor_category_parent_idx" ON "tariffs_visitor_category" USING btree ("parent_id");
  CREATE INDEX "tariffs_updated_at_idx" ON "tariffs" USING btree ("updated_at");
  CREATE INDEX "tariffs_created_at_idx" ON "tariffs" USING btree ("created_at");
  CREATE INDEX "contacts_updated_at_idx" ON "contacts" USING btree ("updated_at");
  CREATE INDEX "contacts_created_at_idx" ON "contacts" USING btree ("created_at");
  CREATE INDEX "affiliated_clubs_reciprocal_green_fee_idx" ON "affiliated_clubs" USING btree ("reciprocal_green_fee_id");
  CREATE INDEX "affiliated_clubs_updated_at_idx" ON "affiliated_clubs" USING btree ("updated_at");
  CREATE INDEX "affiliated_clubs_created_at_idx" ON "affiliated_clubs" USING btree ("created_at");
  CREATE INDEX "committee_members_photograph_idx" ON "committee_members" USING btree ("photograph_id");
  CREATE INDEX "committee_members_contact_idx" ON "committee_members" USING btree ("contact_id");
  CREATE INDEX "committee_members_updated_at_idx" ON "committee_members" USING btree ("updated_at");
  CREATE INDEX "committee_members_created_at_idx" ON "committee_members" USING btree ("created_at");
  CREATE INDEX "newsletters_featured_stories_order_idx" ON "newsletters_featured_stories" USING btree ("_order");
  CREATE INDEX "newsletters_featured_stories_parent_id_idx" ON "newsletters_featured_stories" USING btree ("_parent_id");
  CREATE INDEX "newsletters_cover_image_idx" ON "newsletters" USING btree ("cover_image_id");
  CREATE INDEX "newsletters_pdf_idx" ON "newsletters" USING btree ("pdf_id");
  CREATE INDEX "newsletters_updated_at_idx" ON "newsletters" USING btree ("updated_at");
  CREATE INDEX "newsletters_created_at_idx" ON "newsletters" USING btree ("created_at");
  CREATE UNIQUE INDEX "stories_slug_idx" ON "stories" USING btree ("slug");
  CREATE INDEX "stories_hero_image_idx" ON "stories" USING btree ("hero_image_id");
  CREATE INDEX "stories_updated_at_idx" ON "stories" USING btree ("updated_at");
  CREATE INDEX "stories_created_at_idx" ON "stories" USING btree ("created_at");
  CREATE INDEX "stories__status_idx" ON "stories" USING btree ("_status");
  CREATE INDEX "_stories_v_parent_idx" ON "_stories_v" USING btree ("parent_id");
  CREATE INDEX "_stories_v_version_version_slug_idx" ON "_stories_v" USING btree ("version_slug");
  CREATE INDEX "_stories_v_version_version_hero_image_idx" ON "_stories_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_stories_v_version_version_updated_at_idx" ON "_stories_v" USING btree ("version_updated_at");
  CREATE INDEX "_stories_v_version_version_created_at_idx" ON "_stories_v" USING btree ("version_created_at");
  CREATE INDEX "_stories_v_version_version__status_idx" ON "_stories_v" USING btree ("version__status");
  CREATE INDEX "_stories_v_created_at_idx" ON "_stories_v" USING btree ("created_at");
  CREATE INDEX "_stories_v_updated_at_idx" ON "_stories_v" USING btree ("updated_at");
  CREATE INDEX "_stories_v_latest_idx" ON "_stories_v" USING btree ("latest");
  CREATE INDEX "tee_time_requests_updated_at_idx" ON "tee_time_requests" USING btree ("updated_at");
  CREATE INDEX "tee_time_requests_created_at_idx" ON "tee_time_requests" USING btree ("created_at");
  CREATE INDEX "room_enquiries_updated_at_idx" ON "room_enquiries" USING btree ("updated_at");
  CREATE INDEX "room_enquiries_created_at_idx" ON "room_enquiries" USING btree ("created_at");
  CREATE INDEX "dining_enquiries_updated_at_idx" ON "dining_enquiries" USING btree ("updated_at");
  CREATE INDEX "dining_enquiries_created_at_idx" ON "dining_enquiries" USING btree ("created_at");
  CREATE INDEX "membership_enquiries_updated_at_idx" ON "membership_enquiries" USING btree ("updated_at");
  CREATE INDEX "membership_enquiries_created_at_idx" ON "membership_enquiries" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_course_holes_id_idx" ON "payload_locked_documents_rels" USING btree ("course_holes_id");
  CREATE INDEX "payload_locked_documents_rels_tournaments_id_idx" ON "payload_locked_documents_rels" USING btree ("tournaments_id");
  CREATE INDEX "payload_locked_documents_rels_rooms_id_idx" ON "payload_locked_documents_rels" USING btree ("rooms_id");
  CREATE INDEX "payload_locked_documents_rels_tariffs_id_idx" ON "payload_locked_documents_rels" USING btree ("tariffs_id");
  CREATE INDEX "payload_locked_documents_rels_contacts_id_idx" ON "payload_locked_documents_rels" USING btree ("contacts_id");
  CREATE INDEX "payload_locked_documents_rels_affiliated_clubs_id_idx" ON "payload_locked_documents_rels" USING btree ("affiliated_clubs_id");
  CREATE INDEX "payload_locked_documents_rels_committee_members_id_idx" ON "payload_locked_documents_rels" USING btree ("committee_members_id");
  CREATE INDEX "payload_locked_documents_rels_newsletters_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletters_id");
  CREATE INDEX "payload_locked_documents_rels_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("stories_id");
  CREATE INDEX "payload_locked_documents_rels_tee_time_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("tee_time_requests_id");
  CREATE INDEX "payload_locked_documents_rels_room_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("room_enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_dining_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("dining_enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_membership_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("membership_enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_directions_order_idx" ON "site_settings_directions" USING btree ("_order");
  CREATE INDEX "site_settings_directions_parent_id_idx" ON "site_settings_directions" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "course_holes_additional_tees" CASCADE;
  DROP TABLE "course_holes_hazards" CASCADE;
  DROP TABLE "course_holes" CASCADE;
  DROP TABLE "course_holes_rels" CASCADE;
  DROP TABLE "tournaments_winners" CASCADE;
  DROP TABLE "tournaments_documents" CASCADE;
  DROP TABLE "tournaments" CASCADE;
  DROP TABLE "tournaments_rels" CASCADE;
  DROP TABLE "rooms_amenities" CASCADE;
  DROP TABLE "rooms_tariff_guest_category" CASCADE;
  DROP TABLE "rooms" CASCADE;
  DROP TABLE "rooms_rels" CASCADE;
  DROP TABLE "tariffs_visitor_category" CASCADE;
  DROP TABLE "tariffs" CASCADE;
  DROP TABLE "contacts" CASCADE;
  DROP TABLE "affiliated_clubs" CASCADE;
  DROP TABLE "committee_members" CASCADE;
  DROP TABLE "newsletters_featured_stories" CASCADE;
  DROP TABLE "newsletters" CASCADE;
  DROP TABLE "stories" CASCADE;
  DROP TABLE "_stories_v" CASCADE;
  DROP TABLE "tee_time_requests" CASCADE;
  DROP TABLE "room_enquiries" CASCADE;
  DROP TABLE "dining_enquiries" CASCADE;
  DROP TABLE "membership_enquiries" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "course_status" CASCADE;
  DROP TABLE "course_info" CASCADE;
  DROP TABLE "site_settings_directions" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_course_holes_hazards_hazard_type";
  DROP TYPE "public"."enum_course_holes_verification_status";
  DROP TYPE "public"."enum_tournaments_status";
  DROP TYPE "public"."enum_tournaments_verification_status";
  DROP TYPE "public"."enum_rooms_tariff_guest_category";
  DROP TYPE "public"."enum_rooms_bed_type";
  DROP TYPE "public"."enum_rooms_view";
  DROP TYPE "public"."enum_rooms_verification_status";
  DROP TYPE "public"."enum_tariffs_visitor_category";
  DROP TYPE "public"."enum_tariffs_category";
  DROP TYPE "public"."enum_tariffs_verification_status";
  DROP TYPE "public"."enum_contacts_department";
  DROP TYPE "public"."enum_contacts_public_status";
  DROP TYPE "public"."enum_affiliated_clubs_verification_status";
  DROP TYPE "public"."enum_committee_members_member_status";
  DROP TYPE "public"."enum_stories_category";
  DROP TYPE "public"."enum_stories_status";
  DROP TYPE "public"."enum__stories_v_version_category";
  DROP TYPE "public"."enum__stories_v_version_status";
  DROP TYPE "public"."enum_tee_time_requests_player_category";
  DROP TYPE "public"."enum_tee_time_requests_holes";
  DROP TYPE "public"."enum_tee_time_requests_enquiry_status";
  DROP TYPE "public"."enum_room_enquiries_guest_category";
  DROP TYPE "public"."enum_room_enquiries_enquiry_status";
  DROP TYPE "public"."enum_dining_enquiries_guest_category";
  DROP TYPE "public"."enum_dining_enquiries_enquiry_status";
  DROP TYPE "public"."enum_membership_enquiries_enquiry_status";
  DROP TYPE "public"."enum_media_usage_permission";
  DROP TYPE "public"."enum_course_status_course_status";
  DROP TYPE "public"."enum_course_status_caddy_availability";
  DROP TYPE "public"."enum_course_status_buggy_availability";
  DROP TYPE "public"."enum_course_status_practice_area_status";
  DROP TYPE "public"."enum_course_status_dining_status";
  DROP TYPE "public"."enum_course_info_verification_status";`)
}
