--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.0
-- Dumped by pg_dump version 9.6.0

-- Started on 2017-01-09 21:05:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12387)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2130 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 185 (class 1259 OID 24675)
-- Name: music_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE music_list (
    id bigint NOT NULL,
    video_id integer,
    video_name text,
    video_description text,
    video_thumbnail text
);


ALTER TABLE music_list OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 24690)
-- Name: music_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE music_list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE music_list_id_seq OWNER TO postgres;

--
-- TOC entry 2131 (class 0 OID 0)
-- Dependencies: 186
-- Name: music_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE music_list_id_seq OWNED BY music_list.id;


--
-- TOC entry 2002 (class 2604 OID 24696)
-- Name: music_list id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY music_list ALTER COLUMN id SET DEFAULT nextval('music_list_id_seq'::regclass);


--
-- TOC entry 2122 (class 0 OID 24675)
-- Dependencies: 185
-- Data for Name: music_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY music_list (id, video_id, video_name, video_description, video_thumbnail) FROM stdin;
1	90950093	Chờ ngày mưa tan	Chờ ngày mưa tan	1483970170154-video_5.jpg
2	109359295	Đổi thay	Đổi thay	1483970222510-video_3.jpg
4	124914540	Nỗi nhớ đầy vơi	Nỗi nhớ đầy vơi	1483970327966-video_2.jpg
6	57833340	Chợt thấy em khóc	Chợt thấy em khóc	1483970424395-1483970273645-video_4.jpg
\.


--
-- TOC entry 2132 (class 0 OID 0)
-- Dependencies: 186
-- Name: music_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('music_list_id_seq', 6, true);


--
-- TOC entry 2004 (class 2606 OID 24701)
-- Name: music_list music_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY music_list
    ADD CONSTRAINT music_list_pkey PRIMARY KEY (id);


-- Completed on 2017-01-09 21:05:30

--
-- PostgreSQL database dump complete
--

