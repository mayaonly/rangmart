'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import API from '@/utils/api';

type FooterData = {
  email?: string;
  address?: string;
  timings?: { day: string; time: string }[];
  social_links?: { icon: string; link: string }[];
  hot_categories?: { name: string; url: string }[];
  newsletter_text?: string;
  payment_image?: string;
};

type IProps = {
  style_2?: boolean;
};

const Footer = ({ style_2 = false }: IProps) => {
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const res = await API.get("/homepage");
        console.log("Footer homepage API response:", res.data);
        setData(res.data || {});
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      }
    };
    fetchHomepage();
  }, []);

  return (
    <footer>
      <div className={`tpfooter__area theme-bg-2 ${style_2 ? 'pt-55 footer-border' : ''}`}>
        <div className="tpfooter__top pb-15">
          <div className="container">
            <div className="row">
              {/* Help Section */}
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="tpfooter__widget footer-col-1 mb-50">
                  <h4 className="tpfooter__widget-title">Let Us Help You</h4>
                  <p>
                    If you have any question, please <br /> contact us at:
                    <a href={`mailto:${data?.email || 'support@rangmart.com'}`}>
                      {data?.email}
                    </a>
                  </p>
                  <div className="tpfooter__widget-social mt-45">
                    <span className="tpfooter__widget-social-title mb-5">Social Media:</span>
                    {data?.social_links?.map((s, i) => (
                      <a href={s.link} target="_blank" key={i} rel="noreferrer">
                        <i className={s.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="tpfooter__widget footer-col-2 mb-50">
                  <h4 className="tpfooter__widget-title">Looking for rangmart?</h4>
                  <p>{data?.address || '68 St. Vicent Place, Glasgow, Greater Chennai, India.'}</p>
                  <div className="tpfooter__widget-time-info mt-35">
                    {data?.timings?.map((t, idx) => (
                      <span key={idx}>
                        {t.day}: <b>{t.time}</b>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hot Categories */}
              <div className="col-xl-2 col-lg-4 col-md-4 col-sm-5">
                <div className="tpfooter__widget footer-col-3 mb-50">
                  <h4 className="tpfooter__widget-title">HOT CATEGORIES</h4>
                  <div className="tpfooter__widget-links">
                    <ul>
                      {data?.hot_categories?.map((cat, idx) => (
                        <li key={idx}>
                          <a href={cat.url}>{cat.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="col-xl-4 col-lg-6 col-md-8 col-sm-7">
                <div className="tpfooter__widget footer-col-4 mb-50">
                  <h4 className="tpfooter__widget-title">Our newsletter</h4>
                  <div className="tpfooter__widget-newsletter">
                    <p>
                      {data?.newsletter_text ||
                        'Subscribe to the rangmart mailing list to receive updates on new arrivals & other information.'}
                    </p>
                    <form>
                      <span>
                        <i>
                          <Image
                            src="/assets/img/shape/message-1.svg"
                            alt="icon"
                            width={18}
                            height={15}
                          />
                        </i>
                      </span>
                      <input type="email" placeholder="Your email address..." />
                      <button className="tpfooter__widget-newsletter-submit tp-news-btn">
                        Subscribe
                      </button>
                    </form>
                    <div className="tpfooter__widget-newsletter-check mt-10">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          I accept terms & conditions & privacy policy.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="tpfooter___bottom pt-40 pb-40">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 col-sm-12">
                <div className="tpfooter__copyright">
                  <span className="tpfooter__copyright-text">
                    Copyright © <a href="#">Rangmart</a> all rights reserved. Powered by{' '}
                    <a href="https://mayatechno.com">Mayatechno</a>.
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-md-5 col-sm-12">
                <div className="tpfooter__copyright-thumb text-end">
                  {data?.payment_image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${data.payment_image}`}
                      alt="payment"
                      width={200}
                      height={40}
                      style={{ height: 'auto', width: 'auto' }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
